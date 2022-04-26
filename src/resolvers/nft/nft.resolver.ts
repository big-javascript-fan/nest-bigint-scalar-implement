import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NftService } from 'src/services/nft.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Nft } from '../../models/nft.model';
import { Transaction } from '../../models/transaction.model';
import { Nfts } from '../../models/nfts.model';
import { PrismaService } from '../../services/prisma.service';
import { User } from '../../models/user.model';
import { NftMetadata } from '../../models/nft_metadata.model';
import { UserEntity } from '../../decorators/user.decorator';

@Resolver(() => Nft)
export class NftResolver {
  constructor(private nftService: NftService, private prisma: PrismaService) {}

  // @Query(() => Transaction)
  // async findNftsByWallet(
  //   @Args('wallet') wallet: string
  // ): Promise<Transaction> | null {
  //   const transaction = await this.nftService.findNftsByWallet(wallet);

  //   return transaction ? new Transaction(transaction) : null;
  // }

  @Query(() => Nft, { name: 'nft' })
  async findNFTById(
    @Args('id', { nullable: true }) id: number
  ): Promise<Nft> | null {
    const nft = await this.nftService.findNftById(id);
    return nft ? new Nft(nft) : null;
  }

  @ResolveField('nftMetadata')
  async nftMetadata(@Parent() nft: Nft): Promise<NftMetadata | null> {
    // return data if nft_metadata already fetched
    if (nft.nft_metadata) return new NftMetadata(nft.nft_metadata);

    // fetch nft then format data
    return this.prisma.nft_metadata
      .findUnique({
        where: {
          // @ts-ignore
          id: nft.nft_metadata_id
        }
      })
      .then(nftMetadata => (nftMetadata ? new NftMetadata(nftMetadata) : null));
  }

  @Query(() => Nfts, { name: 'getNftListByWallet' })
  async getNftListByWallet(
    @Args('wallet') wallet: string
  ): Promise<{ nfts: Nft[]; nftsCount: number }> {
    return this.nftService.getNftListByWallet(wallet);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Nfts, {})
  async findNfts(
    @Args('limit', { nullable: true }) limit: number | null,
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('sortList', { nullable: true }) sortList: string | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<{ nfts: Nft[]; nftsCount: number }> {
    const { nfts, _count } = await this.nftService.findNftsAll(
      onePage,
      page,
      sortList,
      searchText
    );
    return { nfts, nftsCount: _count || 0 };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => NftMetadata)
  async updateNftMetadata(
    @UserEntity() user: User,
    @Args('meta_id', { nullable: true }) meta_id: number | null,
    @Args('data', { nullable: true }) data: string | null
  ) {
    return new NftMetadata(
      await this.nftService.updateNftMetaData(meta_id, data)
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Nft)
  async updateSaleInfoJson(
    @UserEntity() user: User,
    @Args('nftId', { nullable: true }) nftId: number | null,
    @Args('data', { nullable: true }) data: string | null
  ) {
    return new Nft(await this.nftService.updateSaleInfo(nftId, data));
  }
}
