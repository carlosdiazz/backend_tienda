import { Field, ObjectType } from '@nestjs/graphql';
//Propio
import { User } from '../../components';

//Se usa en los Query, en los objectos que queremos responder
@ObjectType()
export class AuthResponse {
  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => User)
  user: User;
}
