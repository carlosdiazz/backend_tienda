import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateInventarioInput } from './dto/create-inventario.input';
import { Inventario } from './entities/inventario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InevntarioArgs } from './dto/inventario-all.args';
import { MESSAGE } from 'src/config';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly repository: Repository<Inventario>,
  ) {}

  public async create(
    createInventarioInput: CreateInventarioInput,
  ): Promise<Inventario> {
    try {
      console.log(createInventarioInput);
      const new_entity = this.repository.create(createInventarioInput);
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Inventario> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Inevntario`,
      );
    }
    return entity;
  }

  public async findAll(args: InevntarioArgs): Promise<Inventario[]> {
    const { limit: take, offset: skip, activo, is_ingreso } = args;
    try {
      return await this.repository.find({
        where: {
          is_ingreso,
        },
        order: {
          createAt: 'ASC',
        },
        take,
        skip,
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  //public async findOne(id: number):Promise<Inventario> {
  //  return `This action returns a #${id} inventario`;
  //}

  //public async remove(id: number):Promise<Inventario> {
  //  return `This action removes a #${id} inventario`;
  //}
}
