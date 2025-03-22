import { InputType, Field, Int } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @MinLength(8)
  password: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  role: number[];

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  nickname: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_empleado: number;
}
