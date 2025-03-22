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
    const { id_producto, concepto, cantidad, is_credito } =
      createInventarioInput;

    await this.productoService.findOne(id_producto);

    await this.productoService.modificarStock(id_producto, cantidad, true);

    const product = await this.productoService.findOne(id_producto);
    const new_total_a_pagar = product.price_de_compra * cantidad;

    try {
      const new_entity = this.repository.create({
        concepto,
        cantidad,
        is_credito,
        is_ingreso: true,
        total_a_pagar: new_total_a_pagar,
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

  public async createMediantefactura(
    createInventarioInput: CreateInventarioInput,
  ): Promise<Inventario> {
    const { id_producto, cantidad, concepto, is_credito } =
      createInventarioInput;
    await this.productoService.modificarStock(id_producto, cantidad, false);
    //const product = await this.productoService.findOne(id_producto);
    //const new_total_a_pagar = product.price_de_compra * cantidad;

    try {
      const new_entity = this.repository.create({
        concepto,
        cantidad,
        is_credito,
        is_ingreso: false,
        //total_a_pagar: new_total_a_pagar,
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
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Inventario`,
      );
    }
    return entity;
  }

  public async findAll(args: InevntarioArgs): Promise<Inventario[]> {
    const {
      limit: take,
      offset: skip,
      activo,
      is_ingreso,
      is_credito,
      id_proovedor,
    } = args;
    try {
      return await this.repository.find({
        where: {
          is_ingreso,
          is_credito,
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

  public async changeStatus(id: number): Promise<Inventario> {
    const entity = await this.findOne(id);
    const new_is_credito = !entity.is_credito;
    this.repository.merge(entity, { is_credito: new_is_credito });
    return await this.repository.save(entity);
  }
}
