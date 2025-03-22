import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

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

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  is_generico: boolean;

  @Field(() => String)
  @IsNotEmpty()
  @Matches(/^\d{3}-\d{7}-\d{1}$/, {
    message: 'La cédula debe tener el formato 000-0000000-0',
  })
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
