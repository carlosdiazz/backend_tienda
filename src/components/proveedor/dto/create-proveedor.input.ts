import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateProveedorInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  descripcion: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  telefono: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  direccion: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activo: boolean;
}
