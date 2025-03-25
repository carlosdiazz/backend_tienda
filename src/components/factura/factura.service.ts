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
import {
  CreateFacturaDetalleInput,
  FacturaDetalleService,
} from '../factura_detalle';
import { FilterFacturasArg } from './dto/filter-factura.dto';
import { User, UsersService } from '../users';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly repository: Repository<Factura>,
    private readonly clienteService: ClientesService,
    private readonly productosService: ProductosService,
    private readonly facturaDetalle: FacturaDetalleService,
    private readonly userService: UsersService,
  ) {}

  private generarCodigofactura(): number {
    return Math.floor(1000000 + Math.random() * 9000000);
  }

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

    if (total === total_pagado) {
      return 0;
    }

    throw new BadGatewayException(
      `El monto Pagado => ${total_pagado} debe ser igual al Total => ${total}`,
    );
  }

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
    return Math.floor(total * 1.18);
  }

  private async revisarProductos(productos: ProductoCantidadInput[]) {
    //Verifico que se manden Productos
    if (productos.length === 0) {
      throw new BadGatewayException('No mandaste Productos');
    }

    for (const product of productos) {
      const { stock, is_service } = await this.productosService.findOne(
        product.id_producto,
      );
      if (is_service) {
        continue;
      } else {
        if (stock < product.cantidad) {
          throw new BadGatewayException(`No hay Stock Suficiente `);
        }
      }
    }
  }

  public async create(
    createFacturaInput: CreateFacturaInput,
    user: User,
  ): Promise<Factura> {
    const factura = await this.pre_create(createFacturaInput, user);

    const productos: CreateFacturaDetalleInput[] =
      createFacturaInput.productos.map((i) => {
        return {
          cantidad: i.cantidad,
          id_factura: factura.id,
          id_producto: i.id_producto,
        };
      });

    await this.facturaDetalle.createMany(productos);

    return await this.findOne(factura.id);
  }

  private async pre_create(
    createFacturaInput: CreateFacturaInput,
    user: User,
  ): Promise<Factura> {
    const {
      id_cliente,
      activo,
      is_credito,
      total_pagado,
      productos,
      metodo_pago,
      referencia_pago,
    } = createFacturaInput;

    //Verificar Clientes
    const cliente = await this.clienteService.findOne(id_cliente);

    if (cliente.id === 5 && is_credito === true) {
      throw new UnprocessableEntityException(
        `El cliente ${cliente.name} no puede ser credito`,
      );
    }

    //Verificar IDs Productos y Stock
    await this.revisarProductos(productos);

    //Genero el codigo de factura
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

    if (is_credito && total_pagado === total) {
      throw new UnprocessableEntityException(
        `Si es credito no puedes pagar el monto total`,
      );
    }

    const is_paid = total_pagado === total;

    try {
      const new_entity = this.repository.create({
        activo,
        is_credito,
        total_pagado,
        codigo_factura,
        faltante,
        total,
        is_paid,
        metodo_pago,
        referencia_pago,
        cliente: {
          id: id_cliente,
        },
        user: {
          id: user.id,
        },
      });
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: FilterFacturasArg): Promise<Factura[]> {
    const {
      limit: take,
      offset: skip,
      activo,
      is_paid,
      id_cliente,
      id_user,
    } = pagination;
    try {
      return await this.repository.find({
        where: {
          activo,
          is_paid,
          cliente: { id: id_cliente },
          user: { id: id_user },
        },
        take,
        skip,
      });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  public async findOne(id: number): Promise<Factura> {
    const entity = await this.repository.findOne({
      where: { id },
      select: {
        factura_detalle: true,
      },
    });
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
      await this.update(id, { activo: false, id });
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
