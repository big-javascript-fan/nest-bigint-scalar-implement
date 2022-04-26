import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => Number)
  id: bigint;
}
