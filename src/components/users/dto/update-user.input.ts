import { IsNumber, Min } from 'class-validator';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

//Propio
import { SignupInput } from '../../../auth/dto/signup.input';

@InputType()
export class UpdateUserInput extends PartialType(SignupInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id: number;
}
