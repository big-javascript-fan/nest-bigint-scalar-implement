import { Module } from '@nestjs/common';
import { Web3Service } from '../services/web3.service';
import Web3 from 'web3';
import { PrismaService } from '../services/prisma.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [PrismaService, Web3Service, Web3, LoggerService],
  exports: [Web3Service]
})
export class Web3Module {}
