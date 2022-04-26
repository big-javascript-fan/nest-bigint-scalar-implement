import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { estates, nfts } from '@prisma/client';
import { NftMetadata } from 'src/models/nft_metadata.model';
import { PrismaService } from './prisma.service';
import { Nft } from '../models/nft.model';
import { User } from '../models/user.model';
import { Estate, EstateType } from 'src/models/estate.model';
import { CreateEstateInput } from 'src/resolvers/estates/dto/create-estate.input';
import { UpdateEstateInput } from 'src/resolvers/estates/dto/update-estate.input';
import { OrderByInput } from 'src/resolvers/estates/dto/order-by.input';
import { PriceWhereInput } from 'src/resolvers/estates/dto/price-where.input';

@Injectable()
export class EstateService {
  constructor(private prisma: PrismaService) {}

  async findOffersByWallet(
    wallet: string,
    type: number
  ): Promise<{ estates: Estate[]; _count: number }> {
    // Offer
    if (type == 0) {
      const estateArray = await this.prisma.estates.findMany({
        where: {
          seller: wallet
        },
        include: {
          nft: {
            include: {
              nft_metadata: true
            }
          }
        }
      });

      const res = estateArray.map(
        estate =>
          new Estate({
            ...estate,
            nft: new Nft({
              ...estate.nft,
              nftMetadata: new NftMetadata(estate.nft.nft_metadata)
            })
          })
      );

      return { estates: res, _count: res.length };
    } else {
      // My offer
      const estateArray = await this.prisma.estates.findMany({
        where: {
          buyer: wallet
        },
        include: {
          nft: {
            include: {
              nft_metadata: true
            }
          }
        }
      });

      const res = estateArray.map(
        estate =>
          new Estate({
            ...estate,
            nft: new Nft({
              ...estate.nft,
              nftMetadata: new NftMetadata(estate.nft.nft_metadata)
            })
          })
      );

      return { estates: res, _count: res.length };
    }
  }

  async findSalesByWallet(
    wallet: string
  ): Promise<{ estates: Estate[]; _count: number }> {
    const estateArray = await this.prisma.estates.findMany({
      where: {
        seller: wallet,
        type: EstateType.sale
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      }
    });

    const res = estateArray.map(
      estate =>
        new Estate({
          ...estate,
          nft: new Nft({
            ...estate.nft,
            nftMetadata: new NftMetadata(estate.nft.nft_metadata)
          })
        })
    );

    return { estates: res, _count: res.length };
  }

  async findEstateById(id: number): Promise<Estate> {
    const estate = await this.prisma.estates.findUnique({
      where: {
        id
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      }
    });

    if (!estate) {
      throw new NotFoundException('There is no nft with this id');
    }

    const res = new Estate({
      ...estate,
      nft: new Nft({
        ...estate.nft,
        nft_metadata: estate.nft.nft_metadata
      })
    });

    return res;
  }

  async findSalesBy(
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ estates: Estate[]; _count: number }> {
    const estateList = await this.prisma.estates.findMany({
      where: {
        status,
        type: EstateType.sale,
        price: {
          gt: price.gt ? price.gt : 0,
          lt: price.lt ? price.lt : 100000000000000
        }
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      },
      orderBy: orderBy.price
        ? { price: orderBy.price === 'desc' ? 'desc' : 'asc' }
        : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = estateList.map(
      offer =>
        new Estate({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          })
        })
    );

    return { estates: res, _count: res.length };
  }

  async findOffersBy(
    wallet: string,
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ offers: Estate[]; _count: number }> {
    const offerList = await this.prisma.estates.findMany({
      where: {
        status,
        type: EstateType.offer,
        seller: {
          equals: wallet,
          mode: 'insensitive'
        },
        price: {
          gt: price.gt ? price.gt : 0,
          lt: price.lt ? price.lt : 100000000000000
        }
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      },
      orderBy: orderBy.price
        ? { price: orderBy.price === 'desc' ? 'desc' : 'asc' }
        : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = offerList.map(
      offer =>
        new Estate({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          })
        })
    );

    return { offers: res, _count: res.length };
  }

  async findMyOffersBy(
    wallet: string,
    take?: number,
    skip?: number,
    orderBy?: OrderByInput,
    price?: PriceWhereInput,
    status = 0,
    searchText = null
  ): Promise<{ myOffers: Estate[]; _count: number }> {
    const offerList = await this.prisma.estates.findMany({
      where: {
        status,
        type: EstateType.offer,
        buyer: {
          equals: wallet,
          mode: 'insensitive'
        },
        price: {
          gt: price.gt ? price.gt : 0,
          lt: price.lt ? price.lt : 100000000000000
        }
      },
      include: {
        nft: {
          include: {
            nft_metadata: true
          }
        }
      },
      orderBy: orderBy.price
        ? { price: orderBy.price === 'desc' ? 'desc' : 'asc' }
        : { created_at: 'desc' },
      take: take || 100,
      skip: skip || 0
    });

    const res = offerList.map(
      offer =>
        new Estate({
          ...offer,
          nft: new Nft({
            ...offer.nft,
            nft_metadata: offer.nft.nft_metadata
          })
        })
    );

    return { myOffers: res, _count: res.length };
  }

  async createEstate(seller: User, data: CreateEstateInput): Promise<estates> {
    console.log('data ----', data);
    try {
      if (
        seller.walletAddress.toLowerCase() !==
        data.sellerWalletAddress.toLowerCase()
      ) {
        throw new BadRequestException('API caller is not offer creator');
      }
      const nft = await this.prisma.nfts.findFirst({
        where: {
          id: data.nftId
        }
      });
      if (!nft) {
        throw new BadRequestException('There is no NFT with this id');
      }
      if (
        nft.owner_wallet_address.toLowerCase() !==
          seller.walletAddress.toLowerCase() &&
        data.type == 0
      ) {
        throw new BadRequestException('Api caller is not owner of this NFT');
      }
      const oldEstate = await this.prisma.estates.findMany({
        where: {
          nft_id: data.nftId
        }
      });
      if (oldEstate.length > 0) {
        throw new BadRequestException('This nft is already on marketplace');
      }

      const estate = await this.prisma.estates.create({
        data: {
          nft_id: data.nftId,
          type: data.type,
          token_address: data.tokenAddress,
          seller: seller.walletAddress,
          buyer: data.buyerWalletAddress,
          price: data.sellerPrice,
          seller_signature: data.signature,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          expire_at: new Date(data.sellerDeadline),
          status: data.status ? data.status : 0
        }
      });

      await this.prisma.nfts.update({
        data: {
          is_on_marketplace: true
        },
        where: {
          id: data.nftId
        }
      });

      return estate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateEstate(owner: User, data: UpdateEstateInput): Promise<estates> {
    try {
      if (owner.walletAddress !== data.sellerWalletAddress) {
        throw new BadRequestException('Caller is not owner of this sale');
      }
      const estate = await this.prisma.estates.update({
        data: {
          nft_id: data.nftId,
          token_address: data.tokenAddress,
          seller: data.sellerWalletAddress,
          price: data.sellerPrice,
          seller_signature: data.signature,
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          expire_at: new Date(data.sellerDeadline),
          status: data.status ? data.status : 0
        },
        where: {
          id: data.id
        }
      });
      return estate;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
