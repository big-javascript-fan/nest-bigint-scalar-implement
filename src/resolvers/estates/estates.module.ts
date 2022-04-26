import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { EsateResolver } from './estate.resolver';
import { EstateService } from '../../services/estate.service';

@Module({
  providers: [EsateResolver, EstateService, PrismaService]
})
export class EstateModule {}
