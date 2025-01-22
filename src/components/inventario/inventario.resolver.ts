import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InventarioService } from './inventario.service';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioInput } from './dto/create-inventario.input';

@Resolver(() => Inventario)
export class InventarioResolver {
  constructor(private readonly inventarioService: InventarioService) {}

  @Mutation(() => Inventario)
  createInventario(
    @Args('createInventarioInput') createInventarioInput: CreateInventarioInput,
  ) {
    return this.inventarioService.create(createInventarioInput);
  }

  @Query(() => [Inventario], { name: 'inventario' })
  findAll() {
    return this.inventarioService.findAll();
  }

  @Query(() => Inventario, { name: 'inventario' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inventarioService.findOne(id);
  }

  @Mutation(() => Inventario)
  removeInventario(@Args('id', { type: () => Int }) id: number) {
    return this.inventarioService.remove(id);
  }
}
