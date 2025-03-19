import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propio
import { CreateInventarioInput } from './dto/create-inventario.input';
import { Inventario } from './entities/inventario.entity';
import { InevntarioArgs } from './dto/inventario-all.args';
import { MESSAGE } from '../../config';
import { ProductosService } from '../productos';
import { ProveedorService } from '../proveedor';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly repository: Repository<Inventario>,
    private readonly productoService: ProductosService,
    private readonly proveedorService: ProveedorService,
  ) {}

  public async create(
    createInventarioInput: CreateInventarioInput,
  ): Promise<Inventario> {
    const { id_producto, concepto, cantidad, id_proveedor, is_credito } =
      createInventarioInput;

    await this.productoService.findOne(id_producto);

    await this.productoService.modificarStock(id_producto, cantidad, true);

    if (id_proveedor) {
      await this.proveedorService.findOne(id_proveedor);
    }

    try {
      const new_entity = this.repository.create({
        concepto,
        cantidad,
        is_credito,
        is_ingreso: true,
        producto: {
          id: id_producto,
        },
        proveedor: {
          id: id_proveedor ?? null,
        },
      });
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async createMediantefactura(
    createInventarioInput: CreateInventarioInput,
  ): Promise<Inventario> {
    const { id_producto, cantidad, concepto, is_credito } =
      createInventarioInput;
    await this.productoService.modificarStock(id_producto, cantidad, false);
    try {
      const new_entity = this.repository.create({
        concepto,
        cantidad,
        is_credito,
        is_ingreso: false,
        producto: {
          id: id_producto,
        },
      });
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
          createAt: 'DESC',
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
