import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEstateInput {
  @Field()
  id: number;

  @Field()
  chainId: number;

  @Field()
  sellerPrice: number;

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
  status?: number;
}
