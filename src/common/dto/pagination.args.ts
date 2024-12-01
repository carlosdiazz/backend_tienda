import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  offset = 0;

  @IsOptional()
  @Min(1)
  @Field(() => Int, { nullable: true })
  limit = 10;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
