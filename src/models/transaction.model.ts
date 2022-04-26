import { Field, Float, HideField, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';
import GraphQLJSON from 'graphql-type-json';
import { BaseModel } from './base.model';

@ObjectType()
export class Transaction extends BaseModel {
  constructor(partial: Partial<Transaction>) {
    super();

    Object.assign(this, partial);
  }

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;

  @Field()
  contractId: bigint;

  @Field()
  transactionHash: string;

  @Field(() => Float)
  transactionIndex: bigint;

  @Field()
  status: boolean;

  @Field()
  datetime: Date;

  @Field()
  input: string;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field(() => Float)
  gas: bigint;

  @Field(() => Float)
  gasPrice: bigint;

  @Field(() => Float)
  cumulativeGasUsed: bigint;

  @Field()
  blockHash: string;

  @Field(() => Float)
  blockNumber: bigint;

  @Field(() => Float)
  value: bigint;

  @Field(() => GraphQLJSON, { nullable: true })
  @Expose()
  decodedInput: Prisma.JsonValue | null;

  @Field({ nullable: true })
  @Expose()
  txNameFromInput: string;
}
