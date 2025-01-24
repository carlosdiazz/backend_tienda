import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class InevntarioArgs extends PaginationArgs {
  //@IsOptional()
  //@Min(1)
  //@Field(() => Int, { nullable: true })
  //public limit = 10;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public is_ingreso: boolean;
}
