import { IsNumber, Min } from 'class-validator';
import { CreateProveedorInput } from './create-proveedor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProveedorInput extends PartialType(CreateProveedorInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
