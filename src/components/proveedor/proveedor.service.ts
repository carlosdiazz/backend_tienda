import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedorInput } from './dto/create-proveedor.input';
import { UpdateProveedorInput } from './dto/update-proveedor.input';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly repository: Repository<Proveedor>,
  ) {}

  public async create(
    createProveedorInput: CreateProveedorInput,
  ): Promise<Proveedor> {
    try {
      const new_entity = this.repository.create(createProveedorInput);
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Proveedor[]> {
    const { limit: take, offset: skip, activo } = pagination;
    try {
      return await this.repository.find({
        where: {
          activo,
        },
        order: {
          name: 'ASC',
        },
        take,
        skip,
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Proveedor> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Proveedor`,
      );
    }
    return entity;
  }

  public async update(
    id: number,
    updateProveedorInput: UpdateProveedorInput,
  ): Promise<Proveedor> {
    const entity = await this.findOne(id);
    try {
      this.repository.merge(entity, updateProveedorInput);
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
