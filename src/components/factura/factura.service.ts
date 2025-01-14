import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateFacturaInput,
  ProductoCantidadInput,
} from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';
import { Factura } from './entities/factura.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';
import { Cliente, ClientesService } from '../clientes';
import { ProductosService } from '../productos';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly repository: Repository<Factura>,
    private readonly clienteService: ClientesService,
    private readonly productosService: ProductosService,
  ) {}

  //TODO
  private generarCodigofactura(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  //TODO
  private calcularFaltante(
    cliente: Cliente,
    is_credito: boolean,
    total_pagado: number,
    total: number,
  ): number {
    if (total_pagado > total) {
      throw new BadGatewayException(
        `El monto Pagado => ${total_pagado} no puede ser mayor al Total => ${total}`,
      );
    }
    if (cliente.is_generico && total_pagado !== total) {
      throw new BadGatewayException(
        `El monto Pagado => ${total_pagado} debe ser igual al Total => ${total}`,
      );
    }

    if (is_credito) {
      return total - total_pagado;
    }

    if (total !== total_pagado) {
      throw new BadGatewayException(
        `El monto Pagado => ${total_pagado} debe ser igual al Total => ${total}`,
      );
    }
  }

  //TODO
  private async calcularTotal(
    productos: ProductoCantidadInput[],
  ): Promise<number> {
    let total = 0;
    for (const product of productos) {
      const { price } = await this.productosService.findOne(
        product.id_producto,
      );
      const total_producto = price * product.cantidad;
      total = total + total_producto;
    }
    return total;
  }

  private async revisarProductos(productos: ProductoCantidadInput[]) {
    //Verifico que se manden Productos
    if (productos.length === 0) {
      throw new BadGatewayException('No mandaste Productos');
    }

    for (const product of productos) {
      await this.productosService.findOne(product.id_producto);
    }
  }

  public async create(
    createFacturaInput: CreateFacturaInput,
  ): Promise<Factura> {
    const { id_cliente, activo, is_credito, total_pagado, productos } =
      createFacturaInput;

    //Verificar Clientes
    const cliente = await this.clienteService.findOne(id_cliente);

    //Verificar IDs Productos
    await this.revisarProductos(productos);

    //Genero el codiog de factura
    const codigo_factura = this.generarCodigofactura();

    //Calcular Total
    const total = await this.calcularTotal(productos);

    //Calcular faltante
    const faltante = this.calcularFaltante(
      cliente,
      is_credito,
      total_pagado,
      total,
    );

    try {
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
