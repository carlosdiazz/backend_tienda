import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FacturaDetalleService } from './factura_detalle.service';
import { FacturaDetalle } from './entities/factura_detalle.entity';
import { CreateFacturaDetalleInput } from './dto/create-factura_detalle.input';
import { UpdateFacturaDetalleInput } from './dto/update-factura_detalle.input';

@Resolver(() => FacturaDetalle)
export class FacturaDetalleResolver {
  constructor(private readonly facturaDetalleService: FacturaDetalleService) {}

  @Mutation(() => FacturaDetalle)
  createFacturaDetalle(@Args('createFacturaDetalleInput') createFacturaDetalleInput: CreateFacturaDetalleInput) {
    return this.facturaDetalleService.create(createFacturaDetalleInput);
  }

  @Query(() => [FacturaDetalle], { name: 'facturaDetalle' })
  findAll() {
    return this.facturaDetalleService.findAll();
  }

  @Query(() => FacturaDetalle, { name: 'facturaDetalle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDetalleService.findOne(id);
  }

  @Mutation(() => FacturaDetalle)
  updateFacturaDetalle(@Args('updateFacturaDetalleInput') updateFacturaDetalleInput: UpdateFacturaDetalleInput) {
    return this.facturaDetalleService.update(updateFacturaDetalleInput.id, updateFacturaDetalleInput);
  }

  @Mutation(() => FacturaDetalle)
  removeFacturaDetalle(@Args('id', { type: () => Int }) id: number) {
    return this.facturaDetalleService.remove(id);
  }
}
