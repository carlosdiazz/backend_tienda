import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

//Propio
import { PaginationArgs } from '../../../common';

@ArgsType()
export class RoleArgs extends PaginationArgs {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
