import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationArgs } from 'src/common';

@ArgsType()
export class FilterProductosArg extends PaginationArgs {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public is_service?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  public id_proveedor?: number;
}
