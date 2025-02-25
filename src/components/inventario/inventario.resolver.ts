import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//Propio
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioInput } from './dto/create-inventario.input';
//import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { InevntarioArgs } from './dto/inventario-all.args';
//import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

//@UseGuards(JwtAuthGuard)
@Resolver(() => Inventario)
export class InventarioResolver {
  constructor(private readonly inventarioService: InventarioService) {}

  @Mutation(() => Inventario)
  public async createInventario(
    //@CurrentUser([]) user: User,
    @Args('createInventarioInput') createInventarioInput: CreateInventarioInput,
  ): Promise<Inventario> {
    return this.inventarioService.create(createInventarioInput);
  }

  @Query(() => [Inventario], { name: 'allInventarios' })
  public async findAll(
    //@CurrentUser([]) user: User,
    @Args() args: InevntarioArgs,
  ): Promise<Inventario[]> {
    return await this.inventarioService.findAll(args);
  }

  //@Query(() => Inventario, { name: 'inventario' })
  //findOne(@Args('id', { type: () => Int }) id: number) {
  //  return this.inventarioService.findOne(id);
  //}
  //
  //@Mutation(() => Inventario)
  //removeInventario(@Args('id', { type: () => Int }) id: number) {
  //  return this.inventarioService.remove(id);
  //}
}
