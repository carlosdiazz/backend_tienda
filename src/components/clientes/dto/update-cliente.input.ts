import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateClienteInput } from './create-cliente.input';

@InputType()
export class UpdateClienteInput extends PartialType(CreateClienteInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
