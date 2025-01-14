import { CreateFacturaDetalleInput } from './create-factura_detalle.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFacturaDetalleInput extends PartialType(CreateFacturaDetalleInput) {
  @Field(() => Int)
  id: number;
}
