import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
