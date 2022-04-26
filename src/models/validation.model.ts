import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Validation {
  @Field(() => Boolean)
  isValid: boolean;
}
