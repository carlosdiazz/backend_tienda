import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propio
import { CreateEmpresaInput } from './dto/create-empresa.input';
import { UpdateEmpresaInput } from './dto/update-empresa.input';
import { Empresa } from './entities/empresa.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly repository: Repository<Empresa>,
  ) {}

  public async create(
    createEmpresaInput: CreateEmpresaInput,
  ): Promise<Empresa> {
    try {
      const new_entity = this.repository.create(createEmpresaInput);
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Empresa[]> {
    const { limit: take, offset: skip, activo } = pagination;
    try {
      return await this.repository.find({
        where: {
          activo,
        },
        order: {
          codigo: 'ASC',
        },
        take,
        skip,
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Empresa> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Empleado`,
      );
    }
    return entity;
  }

  public async update(
    id: number,
    updateEmpresaInput: UpdateEmpresaInput,
  ): Promise<Empresa> {
    const entity = await this.findOne(id);
    try {
      this.repository.merge(entity, updateEmpresaInput);
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
