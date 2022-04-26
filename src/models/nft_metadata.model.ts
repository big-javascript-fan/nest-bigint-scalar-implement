import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Prisma } from '@prisma/client';
import { BaseModel } from './base.model';

@ObjectType()
export class NftMetadata extends BaseModel {
  constructor(partial: Partial<NftMetadata>) {
    super();

    Object.assign(this, partial);
  }

  @Field(() => GraphQLJSON, { nullable: true })
  metadata: Prisma.JsonValue;
}
