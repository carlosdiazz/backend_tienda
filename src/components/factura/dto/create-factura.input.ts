import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateFacturaInput {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_cliente: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activo: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_credito: boolean;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  total_pagado: number;
}
