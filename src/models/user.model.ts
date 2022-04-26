import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class User extends BaseModel {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @HideField()
  updatedAt: Date;

  @HideField()
  createdAt: Date;

  @Field()
  lastSignAt: Date;

  @Field({ defaultValue: '', nullable: true })
  status?: number;

  @Field({ defaultValue: '', nullable: true })
  nonce?: string;

  @Field()
  walletAddress: string;
}
