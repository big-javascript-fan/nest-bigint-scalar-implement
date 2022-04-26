import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from '../../services/transaction.service';

@Module({
  providers: [TransactionResolver, TransactionService, PrismaService]
})
export class TransactionModule {}
