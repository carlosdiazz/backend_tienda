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

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  img_url?: string;

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
  stock: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  stock_minimo: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_service: boolean;
}
