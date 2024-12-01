import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//Propio
import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id: number;
}
