import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => BigInt, { nullable: true })
  endCursor?: BigInt;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => BigInt, { nullable: true })
  startCursor?: BigInt;
}
