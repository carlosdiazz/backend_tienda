import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { PaginationArgs } from 'src/common';

@ArgsType()
export class AllComprobante extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  public id_cliente?: number;
}
