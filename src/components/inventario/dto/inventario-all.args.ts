import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

@ArgsType()
export class InevntarioArgs extends PaginationArgs {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public is_ingreso: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  public id_proovedor?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public is_credito: boolean;
}
