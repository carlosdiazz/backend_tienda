import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { ComprobanteService } from './comprobante.service';
import { Comprobante } from './entities/comprobante.entity';
import { CreateComprobanteInput } from './dto/create-comprobante.input';
import { UpdateComprobanteInput } from './dto/update-comprobante.input';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth';
import { User } from '../users';
import { PaginationArgs, ResponsePropioGQl } from '../../common';

@UseGuards(JwtAuthGuard)
@Resolver(() => Comprobante)
export class ComprobanteResolver {
  constructor(private readonly service: ComprobanteService) {}

  @Mutation(() => Comprobante, { name: 'createComprobante' })
  public async create(
    @CurrentUser([]) user: User,
    @Args('createComprobanteInput')
    createComprobanteInput: CreateComprobanteInput,
  ): Promise<Comprobante> {
    return await this.service.create(createComprobanteInput);
  }

  @Query(() => [Comprobante], { name: 'allComprobante' })
  public async findAll(
    @CurrentUser([]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Comprobante[]> {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Comprobante, { name: 'findComprobante' })
  public async findOne(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Comprobante> {
    return this.service.findOne(id);
  }

  @Mutation(() => Comprobante, { name: 'updateComprobante' })
  public async update(
    @Args('updateComprobanteInput')
    updateComprobanteInput: UpdateComprobanteInput,
  ): Promise<Comprobante> {
    return this.service.update(
      updateComprobanteInput.id,
      updateComprobanteInput,
    );
  }

  @Mutation(() => ResponsePropioGQl, { name: 'removeComprobante' })
  public async remove(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return await this.service.remove(id);
  }
}
