import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

//Propio
import { CreateEmpresaInput } from './create-empresa.input';

@InputType()
export class UpdateEmpresaInput extends PartialType(CreateEmpresaInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
