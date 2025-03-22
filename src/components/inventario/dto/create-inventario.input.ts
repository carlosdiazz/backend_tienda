import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateInventarioInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  concepto: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  cantidad: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_producto: number;

  //@Field(() => Int)
  //@IsNumber()
  //@Min(0)
  //total_a_pagar: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_credito: boolean;
}
