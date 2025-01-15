import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

@InputType()
export class CreateComprobanteInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_factura: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  monto_pagado: number;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  concepto: string;
}
