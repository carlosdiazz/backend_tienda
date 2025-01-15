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
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';

@Injectable()
export class ComprobanteService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly repository: Repository<Comprobante>,
  ) {}

  public async create(
    createComprobanteInput: CreateComprobanteInput,
  ): Promise<Comprobante> {
    try {
      const { concepto, id_factura, monto_pagado } = createComprobanteInput;
      const new_entity = this.repository.create({
        concepto,
        monto_pagado,
      });
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Comprobante[]> {
    const { limit: take, offset: skip, activo } = pagination;
    try {
      return await this.repository.find({
        take,
        skip,
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
