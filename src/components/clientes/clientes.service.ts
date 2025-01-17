import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';
import { Cliente } from './entities/cliente.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  public async create(
    createClienteInput: CreateClienteInput,
  ): Promise<Cliente> {
    try {
      const new_entity = this.repository.create(createClienteInput);
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Cliente[]> {
    const { limit: take, offset: skip, activo } = pagination;
    try {
      return await this.repository.find({
        where: {
          activo,
        },
        order: {
          id: 'ASC',
        },
        take,
        skip,
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Cliente> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Cliente`,
      );
    }
    return entity;
  }

  public async update(
    id: number,
    updateClienteInput: UpdateClienteInput,
  ): Promise<Cliente> {
    const entity = await this.findOne(id);
    try {
      this.repository.merge(entity, updateClienteInput);
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
