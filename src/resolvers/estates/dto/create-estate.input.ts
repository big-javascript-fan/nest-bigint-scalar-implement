import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEstateInput {
  @Field()
  chainId: number;

  @Field()
  sellerPrice: number;

  @Field()
  type: number;

  @Field()
  nftId: number;

  @Field()
  tokenAddress: string;

  @Field()
  sellerDeadline: Date;

  @Field()
  signature: string;

  @Field()
  sellerWalletAddress: string;

  @Field({ nullable: true })
  buyerWalletAddress?: string;

  @Field({ nullable: true })
  status?: number;
}
