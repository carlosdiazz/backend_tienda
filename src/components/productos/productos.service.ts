import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propio
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';
import { Producto } from './entities/producto.entity';
import { ResponsePropioGQl } from '../../common';
import { MESSAGE } from '../../config';
import { FilterProductosArg } from './dto/filter-producto.dto';
import { ProveedorService } from '../proveedor';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly repository: Repository<Producto>,
    private readonly proveedorService: ProveedorService,
  ) {}

  public async create(
    createProductoInput: CreateProductoInput,
  ): Promise<Producto> {
    const { id_proveedor } = createProductoInput;
    await this.proveedorService.findOne(id_proveedor);
    try {
      const new_entity = this.repository.create({
        ...createProductoInput,
        proveedor: {
          id: id_proveedor,
        },
        stock: 0,
      });
      const entity = await this.repository.save(new_entity);
      return await this.findOne(entity.id);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  public async findAll(pagination: FilterProductosArg): Promise<Producto[]> {
    const {
      limit: take,
      offset: skip,
      activo,
      is_service,
      id_proveedor,
      is_stock_minimo,
    } = pagination;
    try {
      return await this.repository.find({
        where: {
          activo,
          is_service,
          is_stock_minimo,
          proveedor: {
            id: id_proveedor,
          },
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

  public async findOne(id: number): Promise<Producto> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(
        `${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Producto`,
      );
    }
    return entity;
  }

  public async update(
    id: number,
    updateProductoInput: UpdateProductoInput,
  ): Promise<Producto> {
    const entity = await this.findOne(id);
    try {
      this.repository.merge(entity, updateProductoInput);
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
        message: `Este producto no se puede eliminar ya esta en uso`,
        error: true,
      };
    }
  }

  public async modificarStock(
    id_producto: number,
    cantidad: number,
    is_ingreso: boolean,
  ): Promise<void> {
    const product = await this.findOne(id_producto);
    if (product.is_service) {
      return;
    }

    const new_stock: number = is_ingreso
      ? product.stock + cantidad
      : product.stock - cantidad;

    this.repository.merge(product, { stock: new_stock });
    await this.repository.save(product);
  }

  async check_stock(id: number) {
    const producto = await this.findOne(id);
    if (producto.stock >= producto.stock_minimo) {
      await this.update(id, { is_stock_minimo: false, id });
    } else {
      await this.update(id, { is_stock_minimo: true, id });
    }
  }
}
