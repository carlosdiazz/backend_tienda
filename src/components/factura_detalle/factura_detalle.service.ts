import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propio
import { CreateFacturaDetalleInput } from './dto/create-factura_detalle.input';
import { FacturaDetalle } from './entities/factura_detalle.entity';
import { ProductosService } from '../productos';
import { InventarioService } from '../inventario';

@Injectable()
export class FacturaDetalleService {
  constructor(
    @InjectRepository(FacturaDetalle)
    private readonly repository: Repository<FacturaDetalle>,
    private readonly productoService: ProductosService,
    private readonly inventarioService: InventarioService,
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
      //Disminuir Stock
      await this.inventarioService.createMediantefactura({
        id_producto,
        cantidad,
        concepto: 'EGRESO POR FACTURA',
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
}
