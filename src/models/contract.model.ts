import {
  Field,
  HideField,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { BaseModel } from './base.model';

export enum ChainType {
  BSC = 'BSC',
  BscTestnet = 'BSC Testnet'
}

registerEnumType(ChainType, {
  name: 'ChainType',
  description: 'Contract chain type'
});

@ObjectType()
export class Contract extends BaseModel {
  constructor(partial: Partial<Contract>) {
    super();

    Object.assign(this, partial);
  }

  @Field()
  name: string;

  // public_key
  @HideField()
  public_key: string;

  @Field(() => String)
  @Expose()
  get publicKey(): string {
    return this.public_key;
  }

  // chainType
  @Field(() => ChainType, { nullable: true })
  @Expose()
  get chainType(): string | null {
    if (!this.contractJson) return null;
    if (this.contractJson.chain_type === 'BSC') return 'BSC';
    if (this.contractJson.chain_type === 'BSC Testnet') return 'BscTestnet';

    return null;
  }

  // contractJson
  @HideField()
  contractJson: any;

  // updatedAt
  @Field()
  updatedAt: Date;

  // createdAt
  @Field()
  createdAt: Date;
}
