import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PriceWhereInput {
  @Field()
  gt: number;

  @Field()
  lt: number;
}
