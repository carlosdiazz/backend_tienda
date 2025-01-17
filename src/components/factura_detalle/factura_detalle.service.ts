import {
  BadGatewayException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { CreateFacturaDetalleInput } from './dto/create-factura_detalle.input';
import { FacturaDetalle } from './entities/factura_detalle.entity';
import { ProductosService } from '../productos';

@Injectable()
export class FacturaDetalleService {
  constructor(
    @InjectRepository(FacturaDetalle)
    private readonly repository: Repository<FacturaDetalle>,
    private readonly dataSource: DataSource,
    private readonly productoService: ProductosService,
  ) {}

  public async createMany(productos: CreateFacturaDetalleInput[]) {
    for (let index = 0; index < productos.length; index++) {
      const element = productos[index];
      await this.create(element);
    }
  }

  public async create(
    createFacturaDetalleInput: CreateFacturaDetalleInput,
  ): Promise<void> {
    try {
      const { cantidad, id_factura, id_producto } = createFacturaDetalleInput;
      const producto = await this.productoService.findOne(id_producto);

      let new_stock = 0;
      if (producto.is_service) {
        //Si es Servicio no rebajo el Stock
        new_stock = producto.stock;
      } else {
        //Disminiur el stock
        new_stock = producto.stock - cantidad;
      }

      await this.productoService.update(producto.id, {
        stock: new_stock,
        id: producto.id,
      });

      const new_entity = this.repository.create({
        cantidad: cantidad,
        factura: { id: id_factura },
        producto: { id: id_producto },
        precio: producto.price,
        total: producto.price * cantidad,
      });
      await this.repository.save(new_entity);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  //// Método que maneja la transacción y llama al método de creación por separado
  //public async createMany(
  //  productos: CreateFacturaDetalleInput[],
  //): Promise<void> {
  //  const queryRunner = this.dataSource.createQueryRunner();
  //  await queryRunner.connect();
  //  await queryRunner.startTransaction();
  //
  //  try {
  //    for (const producto of productos) {
  //      await this.createWithValidation(queryRunner, producto);
  //    }
  //
  //    await queryRunner.commitTransaction();
  //  } catch (error) {
  //    await queryRunner.rollbackTransaction();
  //    throw new BadGatewayException(
  //      `Error al crear los detalles de la factura: ${error.message}`,
  //    );
  //  } finally {
  //    await queryRunner.release();
  //  }
  //}
  //
  //// Método separado que realiza la creación y validaciones
  //private async createWithValidation(
  //  queryRunner: QueryRunner,
  //  createFacturaDetalleInput: CreateFacturaDetalleInput,
  //): Promise<void> {
  //  const { cantidad, id_factura, id_producto } = createFacturaDetalleInput;
  //
  //  // Validaciones personalizadas
  //  if (cantidad <= 0) {
  //    throw new BadGatewayException('La cantidad debe ser mayor a 0');
  //  }
  //
  //  const producto = await this.productoService.findOne(id_producto);
  //
  //  if (producto.stock < cantidad) {
  //    throw new BadGatewayException('No hay Stock suficiente para esta orden');
  //  }
  //
  //  // Crear la entidad
  //  const newEntity = this.repository.create({
  //    cantidad,
  //    factura: { id: id_factura },
  //    producto: { id: id_producto },
  //    precio: producto.price,
  //    total: cantidad * producto.price,
  //  });
  //
  //  // Guardar la entidad en el contexto de la transacción
  //  await queryRunner.manager.save(FacturaDetalle, newEntity);
  //}
}
