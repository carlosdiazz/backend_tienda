import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  permiso_accion: number[];

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
