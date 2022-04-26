import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Nft } from './nft.model';

@ObjectType()
export class Nfts {
  constructor(partial: Partial<Nfts>) {
    Object.assign(this, partial);
  }

  @Field(() => [Nft], { nullable: true })
  nfts: Nft[];

  // count aliases
  @HideField()
  _count?: { nfts?: number };

  @Field(() => Number, { nullable: true })
  @Expose()
  get nftsCount(): number {
    return this._count ? this._count.nfts : 0;
  }
}
