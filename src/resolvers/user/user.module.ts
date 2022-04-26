import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../../services/prisma.service';
import { UserService } from '../../services/user.service';

@Module({
  providers: [UserResolver, UserService, PrismaService]
})
export class UserModule {}
