import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}

@ObjectType()
export class Nonce {
  @Field({ defaultValue: '' })
  nonce?: string;
}
