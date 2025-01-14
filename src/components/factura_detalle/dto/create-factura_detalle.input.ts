import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class CreateFacturaDetalleInput {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_producto: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_factura: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  cantidad: number;
}
