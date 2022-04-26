import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transaction } from '../models/transaction.model';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}
  async getTransactionByUserId(
    userId
  ): Promise<{ transactions: Transaction[]; totalCount: number }> {
    const user = await this.prisma.users.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundException('There is no such user with this user id');
    }

    const transactionsList = await this.prisma.transactions.findMany({
      where: {
        OR: [{ from: user.walletAddress }, { to: user.walletAddress }]
      }
    });

    const totalCount = transactionsList.length;

    return {
      transactions: transactionsList.map(
        transaction =>
          new Transaction({
            ...transaction
          })
      ),
      totalCount
    };
  }
}
