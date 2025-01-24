import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

@InputType()
export class CreateInventarioInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  concepto: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  existencia: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_producto: number;
}
