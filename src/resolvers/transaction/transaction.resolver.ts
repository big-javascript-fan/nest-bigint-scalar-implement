import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from 'src/services/transaction.service';
import { PrismaService } from '../../services/prisma.service';

import { Transaction } from '../../models/transaction.model';
import { Transactions } from '../../models/transactions.model';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private prisma: PrismaService,
    private transactionService: TransactionService
  ) {}

  // @Query(() => Transactions, { name: 'getTransactionListByUserId' })
  // async getTransactionsByUserId(
  //   @Args('userId', { nullable: true }) userId: number | null
  // ): Promise<{ transactions: Transaction[]; transactionsCount: number }> {
  //   const {
  //     transactions,
  //     totalCount = 0
  //   } = await this.transactionService.getTransactionByUserId(userId);
  //   return { transactions, transactionsCount: totalCount };
  // }
}
