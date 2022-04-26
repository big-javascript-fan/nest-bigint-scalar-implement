import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { TestService } from '../../services/test.service';
import { TestResolver } from './test.resolver';

@Module({
  providers: [PrismaService, TestService, TestResolver]
})
export class TestModule {}
