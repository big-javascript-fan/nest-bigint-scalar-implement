import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderByInput {
  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  created_at?: string;
}
