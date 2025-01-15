import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateComprobanteInput } from './create-comprobante.input';

@InputType()
export class UpdateComprobanteInput extends PartialType(
  CreateComprobanteInput,
) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
