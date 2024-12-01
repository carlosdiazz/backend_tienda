import { Field, InputType, Int } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

//Propios

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @Field(() => String, { nullable: true })
  @MinLength(8)
  password: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  role: number[];

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  nickname: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
