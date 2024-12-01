import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

//Propio
import { CreateProductoInput } from './create-producto.input';

@InputType()
export class UpdateProductoInput extends PartialType(CreateProductoInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
