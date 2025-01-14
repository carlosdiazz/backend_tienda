import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { FacturaService } from './factura.service';
import { Factura } from './entities/factura.entity';
import { CreateFacturaInput } from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Factura)
export class FacturaResolver {
  constructor(private readonly service: FacturaService) {}

  @Mutation(() => Factura, { name: 'createFactura' })
  public async create(
    @CurrentUser([]) user: User,
    @Args('createFacturaInput') createFacturaInput: CreateFacturaInput,
  ): Promise<Factura> {
    return await this.service.create(createFacturaInput);
  }

  @Query(() => [Factura], { name: 'allFactura' })
  public async findAll(
    @CurrentUser([]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Factura[]> {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Factura, { name: 'findFactura' })
  public async findOne(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Factura> {
    return this.service.findOne(id);
  }

  @Mutation(() => Factura, { name: 'updateFactura' })
  public async update(
    @Args('updateFacturaInput') updateFacturaInput: UpdateFacturaInput,
  ): Promise<Factura> {
    return this.service.update(updateFacturaInput.id, updateFacturaInput);
  }

  @Mutation(() => ResponsePropioGQl, { name: 'removeFactura' })
  public async remove(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return await this.service.remove(id);
  }
}
