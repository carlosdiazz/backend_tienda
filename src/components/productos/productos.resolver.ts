import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//Propio
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../users';
import { FilterProductosArg } from './dto/filter-producto.dto';

@UseGuards(JwtAuthGuard)
@Resolver(() => Producto)
export class ProductosResolver {
  constructor(private readonly productosService: ProductosService) {}

  @Mutation(() => Producto)
  public async createProducto(
    @CurrentUser([]) user: User,
    @Args('createProductoInput') createProductoInput: CreateProductoInput,
  ): Promise<Producto> {
    return await this.productosService.create(createProductoInput);
  }

  @Query(() => [Producto], { name: 'allProductos' })
  public async findAll(
    @CurrentUser([]) user: User,
    @Args() paginationArgs: FilterProductosArg,
  ): Promise<Producto[]> {
    return await this.productosService.findAll(paginationArgs);
  }

  @Query(() => Producto, { name: 'findProducto' })
  public async findOne(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Producto> {
    return await this.productosService.findOne(id);
  }

  @Mutation(() => Producto)
  public async updateProducto(
    @CurrentUser([]) user: User,
    @Args('updateProductoInput') updateProductoInput: UpdateProductoInput,
  ): Promise<Producto> {
    return await this.productosService.update(
      updateProductoInput.id,
      updateProductoInput,
    );
  }

  @Mutation(() => ResponsePropioGQl)
  public async removeProducto(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return await this.productosService.remove(id);
  }
}
