import { Injectable, Logger } from '@nestjs/common';
import { nonceGenerator } from 'src/utils/nonceGenerator';
import Web3 from 'web3';
import { PrismaService } from './prisma.service';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}
  async createFakeAccounts(amount: number): Promise<any> {
    const contract = await this.prisma.contracts.findFirst({
      where: { name: 'NFTDev' },
      include: {
        blockchain: true
      }
    });
    const web3 = new Web3(contract.blockchain.rpcProvider);
    let lastUserId;
    for (let i = 0; i < amount; i++) {
      const account = web3.eth.accounts.create();
      const user = await this.prisma.users.create({
        data: {
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          status: 0,
          nonce: nonceGenerator(),
          walletAddress: account.address
        }
      });

      lastUserId = user.id;
    }

    return lastUserId;
  }
}
