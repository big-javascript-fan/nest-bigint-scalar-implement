import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { nft_metadata, Prisma } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';
import { BaseModel } from './base.model';
import { NftMetadata } from './nft_metadata.model';
import { Estate } from './estate.model';

@ObjectType()
export class Nft extends BaseModel {
  constructor(partial: Partial<Nft>) {
    super();

    Object.assign(this, partial);
  }

  @HideField()
  updated_at: Date;

  @HideField()
  created_at: Date;

  @HideField()
  last_sale: Date;

  @HideField()
  is_on_marketplace: boolean;

  // fields

  @Field({ defaultValue: '', nullable: true })
  show: boolean;

  // aliases
  @Field({
    description:
      'Identifies the date and time when the object was last updated.'
  })
  @Expose()
  get updatedAt(): Date {
    return this.updated_at;
  }

  @Field({
    description: 'Identifies the date and time when the object was created.'
  })
  @Expose()
  get createdAt(): Date {
    return this.created_at;
  }

  @Field({ nullable: true })
  status: number;

  // nft_metadata_id alias
  @HideField()
  nft_metadata_id: number | bigint | null;

  @Field(() => Number, { nullable: true })
  @Expose()
  get nftMetadataId(): number | bigint | null {
    return this.nft_metadata_id;
  }

  // nft_metadata alias
  @HideField()
  nft_metadata: nft_metadata;

  @Field(() => NftMetadata, { nullable: true })
  @Expose()
  get nftMetadata(): NftMetadata | null {
    return this.nft_metadata
      ? new NftMetadata({
          // @ts-ignore
          id: this.nft_metadata.id,
          metadata: this.nft_metadata.metadata
        })
      : null;
  }

  @HideField()
  sale_info: Prisma.JsonValue;

  @Field(() => GraphQLJSON, { nullable: true })
  @Expose()
  get saleInfo(): Prisma.JsonValue | null {
    return this.sale_info ? this.sale_info : null;
  }

  // organization_id alias
  @HideField()
  token_id: string;

  @Field(() => String, { nullable: true })
  @Expose()
  get tokenId(): string {
    return this.token_id;
  }

  // owner_address alias
  @HideField()
  owner_wallet_address?: string | null;

  @Field(() => String || null, { nullable: true })
  @Expose()
  get ownerWalletAddress(): string {
    return this.owner_wallet_address;
  }

  @Field(() => Boolean)
  @Expose()
  get isOnMarketplace(): boolean {
    return this.is_on_marketplace;
  }

  @Field(() => Date)
  @Expose()
  get lastSale(): Date {
    return this.last_sale;
  }

  @Field(() => [Estate], { nullable: true })
  estates?: Estate[];
}
