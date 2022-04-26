import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateNftData {
  @Field({ nullable: true })
  status?: number;

  @Field({ nullable: true })
  show?: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  nft_metadata?: Prisma.JsonValue;

  @Field({ nullable: true })
  hidden_metadata?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  saleinfo?: Prisma.JsonValue;
}
