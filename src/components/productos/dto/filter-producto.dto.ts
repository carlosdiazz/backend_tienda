import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationArgs } from 'src/common';

@ArgsType()
export class FilterProductosArg extends PaginationArgs {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public is_service?: boolean;
}
