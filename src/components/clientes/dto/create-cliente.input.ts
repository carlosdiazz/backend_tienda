import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateClienteInput {
  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activo: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_generico: boolean;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  documento: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  tipo_documento: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  telefono: string;
}
