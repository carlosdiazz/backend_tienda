import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInventarioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
