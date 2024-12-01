import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propio
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';
import { Producto } from './entities/producto.entity';
import { ResponsePropioGQl } from '../../common';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  public async create(
    createProductoInput: CreateProductoInput,
  ): Promise<Producto> {
    throw new BadRequestException('TODO');
  }

  public async findAll(): Promise<Producto[]> {
    throw new BadRequestException('TODO');
  }

  public async findOne(id: number): Promise<Producto> {
    throw new BadRequestException('TODO');
  }

  public async update(
    id: number,
    updateProductoInput: UpdateProductoInput,
  ): Promise<Producto> {
    throw new BadRequestException('TODO');
  }

  public async remove(id: number): Promise<ResponsePropioGQl> {
    throw new BadRequestException('TODO');
  }
}
