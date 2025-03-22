import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

@InputType()
export class ProductoCantidadInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_producto: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  cantidad: number;
}

@InputType()
export class CreateFacturaInput {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_cliente: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_user: number;

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

  @Field(() => String)
  @IsOptional()
  @IsString()
  referencia_pago: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  metodo_pago: string;

  @Field(() => [ProductoCantidadInput])
  @ValidateNested({ each: true }) // Valida cada elemento del arreglo
  @Type(() => ProductoCantidadInput)
  productos: ProductoCantidadInput[];
}
//ok
