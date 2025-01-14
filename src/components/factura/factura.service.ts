import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFacturaInput } from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';
import { Factura } from './entities/factura.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';
import { ClientesService } from '../clientes';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly repository: Repository<Factura>,
    private readonly clienteService: ClientesService,
  ) {}

  //TODO
  private generarCodigofactura(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  //TODO
  private calcularFaltante(): number {
    return 10;
  }

  //TODO
  private calcularTotal(): number {
    return 100;
  }

  public async create(
    createFacturaInput: CreateFacturaInput,
  ): Promise<Factura> {
    const { id_cliente, activo, is_credito, total_pagado } = createFacturaInput;

    //Verifico que el cliente exista
    await this.clienteService.findOne(id_cliente);

    try {
      //Genero el codiog de factura
      const codigo_factura = this.generarCodigofactura();

      //Calcular faltante
      const faltante = this.calcularFaltante();

      //Calcualr Total
      const total = this.calcularTotal();

      const new_entity = this.repository.create({
        activo,
        is_credito,
        total_pagado,
        codigo_factura,
        faltante,
        total,
        cliente: {
          id: id_cliente,
        },
      });
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Factura[]> {
    const { limit: take, offset: skip, activo } = pagination;
    try {
      return await this.repository.find({
        where: {
          activo,
        },
        take,
        skip,
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Factura> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Factura`,
      );
    }
    return entity;
  }

  public async update(
    id: number,
    updateFacturaInput: UpdateFacturaInput,
  ): Promise<Factura> {
    const entity = await this.findOne(id);
    try {
      this.repository.merge(entity, updateFacturaInput);
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
