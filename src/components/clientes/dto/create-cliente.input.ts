import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
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
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  //@IsNotEmpty()
  //@Matches(/^\d{3}-\d{7}-\d{1}$/, {
  //  message: 'La cédula debe tener el formato 000-0000000-0',
  //})
  //@IsOptional()
  documento: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  tipo_documento: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  telefono: string;
}
