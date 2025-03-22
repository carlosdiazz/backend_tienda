import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { ProveedorService } from './proveedor.service';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedorInput } from './dto/create-proveedor.input';
import { UpdateProveedorInput } from './dto/update-proveedor.input';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';

@UseGuards(JwtAuthGuard)
@Resolver(() => Proveedor)
export class ProveedorResolver {
  constructor(private readonly service: ProveedorService) {}

  @Mutation(() => Proveedor, { name: 'createProveedor' })
  public async create(
    @CurrentUser([]) user: User,
    @Args('createProveedorInput') createProveedorInput: CreateProveedorInput,
  ): Promise<Proveedor> {
    return await this.service.create(createProveedorInput);
  }

  @Query(() => [Proveedor], { name: 'allProveedor' })
  public async findAll(
    @CurrentUser([]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Proveedor[]> {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Proveedor, { name: 'findProveedor' })
  public async findOne(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Proveedor> {
    return this.service.findOne(id);
  }

  @Mutation(() => Proveedor, { name: 'updateProveedor' })
  public async update(
    @CurrentUser([]) user: User,
    @Args('updateProveedorInput') updateProveedorInput: UpdateProveedorInput,
  ): Promise<Proveedor> {
    return this.service.update(updateProveedorInput.id, updateProveedorInput);
  }

  @Mutation(() => ResponsePropioGQl, { name: 'removeProveedor' })
  public async remove(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return await this.service.remove(id);
  }
}
