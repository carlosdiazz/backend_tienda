import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';
//import { CurrentUser } from '../../auth/decorators/current-user.decorator';
//import { User } from '../users/entities/user.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
//import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly service: ClientesService) {}

  @Mutation(() => Cliente, { name: 'createCliente' })
  public async create(
    //@CurrentUser([]) user: User,
    @Args('createClienteInput') createClienteInput: CreateClienteInput,
  ): Promise<Cliente> {
    return await this.service.create(createClienteInput);
  }

  @Query(() => [Cliente], { name: 'allCliente' })
  public async findAll(
    //@CurrentUser([]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Cliente[]> {
    return this.service.findAll(paginationArgs);
  }

  @Query(() => Cliente, { name: 'findCliente' })
  public async findOne(
    //@CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Cliente> {
    return this.service.findOne(id);
  }

  @Mutation(() => Cliente, { name: 'updateCliente' })
  public async update(
    @Args('updateClienteInput') updateClienteInput: UpdateClienteInput,
  ): Promise<Cliente> {
    return this.service.update(updateClienteInput.id, updateClienteInput);
  }

  @Mutation(() => ResponsePropioGQl, { name: 'removeCliente' })
  public async remove(
    //@CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return await this.service.remove(id);
  }
}
