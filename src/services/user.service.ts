import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { User } from '../models/user.model';
import { nonceGenerator } from '../utils/nonceGenerator';
import { CreateUserInput } from '../resolvers/user/dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: User, newUserData: CreateUserInput) {
    const { walletAddress, status, nonce } = newUserData || {};

    return this.prisma.users.create({
      data: {
        status,
        nonce,
        walletAddress
      }
    });
  }

  findOrCreateUserByWallet(walletAddress: string): Promise<users> {
    return this.prisma.users.upsert({
      where: { walletAddress: walletAddress },
      update: {},
      create: {
        walletAddress: walletAddress,
        nonce: nonceGenerator(),
        status: 0
      }
    });
  }

  async findUserById(id: number, walletAddress: string): Promise<User> {
    return this.prisma.users.findFirst({
      where: {
        id,
        walletAddress
      }
    });
  }

  async findUsers(
    limit = 10,
    page = 0,
    onePage = 10,
    sortList = ''
  ): Promise<{ users: User[]; totalCount: number }> {
    const userList = await this.prisma.users.findMany({
      orderBy: JSON.parse(sortList),
      take: limit,
      skip: page * onePage
    });

    const totalCount = await this.prisma.users.count({});

    return {
      users: userList.map(user => {
        return new User(user);
      }),
      totalCount
    };
  }
}
