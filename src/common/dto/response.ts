import { Field, ObjectType } from '@nestjs/graphql';

export class ResponsePropioHttp {
  message: string;
  statusCode: number;
  error?: string;
  data?: any[] | Object;
}

@ObjectType()
export class ResponsePropioGQl {
  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  error: boolean;
}
