import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateEmpresaInput {
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

  @Field(() => String)
  @IsString()
  @Matches(/^\d{3}-\d{7}-\d{1}$/, {
    message: 'La cédula debe tener el formato 000-0000000-0',
  })
  cedula: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  sueldo: number;

  @Field(() => String)
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/) // Expresion regular para recibir la fecha en AAAA:MM:DD  2022-10-19
  fecha: Date;
}
