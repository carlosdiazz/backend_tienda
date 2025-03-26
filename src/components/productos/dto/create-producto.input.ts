import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateProductoInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  descripcion: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activo: boolean;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  codigo: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  price_de_compra: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_proveedor: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  stock_minimo: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_service: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  public is_stock_minimo?: boolean;
}
