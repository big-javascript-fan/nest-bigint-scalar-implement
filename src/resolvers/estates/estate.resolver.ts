import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EstateService } from 'src/services/estate.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Nfts } from '../../models/nfts.model';
import { PrismaService } from '../../services/prisma.service';
import { User } from '../../models/user.model';
import { UserEntity } from '../../decorators/user.decorator';
import { Estate } from 'src/models/estate.model';
import { Estates } from 'src/models/estates.model';
import { CreateEstateInput } from './dto/create-estate.input';
import { UpdateEstateInput } from './dto/update-estate.input';
import { OrderByInput } from './dto/order-by.input';
import { PriceWhereInput } from './dto/price-where.input';

@Resolver(() => Estate)
export class EsateResolver {
  constructor(
    private estateService: EstateService,
    private prisma: PrismaService
  ) {}

  @Query(() => Estates)
  async findOffersByWalletAddress(
    @Args('wallet') wallet: string,
    @Args('type') type: number
  ): Promise<Estates> {
    const { estates, _count } = await this.estateService.findOffersByWallet(
      wallet,
      type
    );

    return new Estates({ estates, _count: _count || 0 });
  }

  @Query(() => Estates)
  async findSalesByWalletAddress(
    @Args('wallet') wallet: string
  ): Promise<Estates> {
    const { estates, _count } = await this.estateService.findSalesByWallet(
      wallet
    );

    return new Estates({ estates, _count: _count || 0 });
  }

  @Query(() => Estate, { name: 'offer' })
  async findEstateById(
    @Args('id', { nullable: true }) id: number
  ): Promise<Estate> | null {
    const offer = await this.estateService.findEstateById(id);
    return offer ? new Estate(offer) : null;
  }

  @Query(() => Estates, {})
  async findSalesBy(
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('orderBy', { nullable: true }) orderBy: OrderByInput,
    @Args('price', { nullable: true }) price: PriceWhereInput,
    @Args('status', { nullable: true }) status: number | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<Estates> {
    const { estates, _count } = await this.estateService.findSalesBy(
      onePage,
      page,
      orderBy,
      price,
      status,
      searchText
    );
    return new Estates({ estates, _count: _count || 0 });
  }

  @Query(() => Estates, {})
  async findOffersBy(
    @Args('wallet', { nullable: true }) wallet: string,
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('orderBy', { nullable: true }) orderBy: OrderByInput,
    @Args('price', { nullable: true }) price: PriceWhereInput,
    @Args('status', { nullable: true }) status: number | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<Estates> {
    const { offers, _count } = await this.estateService.findOffersBy(
      wallet,
      onePage,
      page,
      orderBy,
      price,
      status,
      searchText
    );
    return new Estates({ estates: offers, _count: _count || 0 });
  }

  @Query(() => Estates, {})
  async findMyOffersBy(
    @Args('wallet', { nullable: true }) wallet: string,
    @Args('page', { nullable: true }) page: number | null,
    @Args('onePage', { nullable: true }) onePage: number | null,
    @Args('orderBy', { nullable: true }) orderBy: OrderByInput,
    @Args('price', { nullable: true }) price: PriceWhereInput,
    @Args('status', { nullable: true }) status: number | null,
    @Args('searchText', { nullable: true }) searchText: string | null
  ): Promise<Estates> {
    const { myOffers, _count } = await this.estateService.findMyOffersBy(
      wallet,
      onePage,
      page,
      orderBy,
      price,
      status,
      searchText
    );
    return new Estates({ estates: myOffers, _count: _count || 0 });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Estate)
  async createEstate(
    @UserEntity() user: User,
    @Args('data') data: CreateEstateInput
  ) {
    return new Estate(await this.estateService.createEstate(user, data));
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Estate)
  async updateEstate(
    @UserEntity() user: User,
    @Args('data') data: UpdateEstateInput
  ) {
    return new Estate(await this.estateService.updateEstate(user, data));
  }
}
