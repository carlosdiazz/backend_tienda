import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateComprobanteInput } from './dto/create-comprobante.input';
import { UpdateComprobanteInput } from './dto/update-comprobante.input';
import { Comprobante } from './entities/comprobante.entity';
import { ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';
import { FacturaService } from '../factura';
import { AllComprobante } from './dto/all-comporbante.dto';

@Injectable()
export class ComprobanteService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly repository: Repository<Comprobante>,
    private readonly facturaService: FacturaService,
  ) {}

  private async actualizar_monto(monto_pagado: number, id_factura: number) {
    //Verifico que la factura exista
    const factura = await this.facturaService.findOne(id_factura);

    //Calculo el nuevo monto
    const new_monto = factura.total_pagado + monto_pagado;

    if (new_monto > factura.total) {
      throw new BadRequestException(
        'No puedes pagar por encima del total de la factura',
      );
    }

    const new_faltante = factura.faltante - monto_pagado;

    await this.facturaService.update(id_factura, {
      id: id_factura,
      total_pagado: new_monto,
      is_paid: new_faltante === 0 ? true : false,
      faltante: new_faltante,
    });
  }

  public async create(
    createComprobanteInput: CreateComprobanteInput,
  ): Promise<Comprobante> {
    const { concepto, id_factura, monto_pagado, metodo_pago, referencia_pago } =
      createComprobanteInput;
    await this.actualizar_monto(monto_pagado, id_factura);
    try {
      const new_entity = this.repository.create({
        concepto,
        monto_pagado,
        referencia_pago,
        metodo_pago,
        factura: {
          id: id_factura,
        },
      });
      const entity = await this.repository.save(new_entity);

      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: AllComprobante): Promise<Comprobante[]> {
    const { limit: take, offset: skip, activo, id_cliente } = pagination;
    try {
      return await this.repository.find({
        where: {
          factura: {
            cliente: {
              id: id_cliente,
            },
          },
        },
        take,
        skip,
        order: {
          createAt: 'DESC',
        },
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Comprobante> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Comprobante`,
      );
    }
    return entity;
  }

  public async update(
    id: number,
    updateComprobanteInput: UpdateComprobanteInput,
  ): Promise<Comprobante> {
    const entity = await this.findOne(id);
    try {
      this.repository.merge(entity, updateComprobanteInput);
      return await this.repository.save(entity);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async remove(id: number): Promise<ResponsePropioGQl> {
    const entity = await this.findOne(id);
    try {
      await this.repository.remove(entity);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        error: false,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        error: true,
      };
    }
  }
}
