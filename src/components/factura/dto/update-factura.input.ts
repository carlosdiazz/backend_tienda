import { IsNumber, IsOptional, Min } from 'class-validator';
import { CreateFacturaInput } from './create-factura.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFacturaInput extends PartialType(CreateFacturaInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  faltante?: number;
}
