import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { NftResolver } from './nft.resolver';
import { NftService } from '../../services/nft.service';

@Module({
  providers: [NftResolver, NftService, PrismaService]
})
export class NftModule {}
