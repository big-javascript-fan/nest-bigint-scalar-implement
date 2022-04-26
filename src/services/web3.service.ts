/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class Web3Service {
  constructor(private prisma: PrismaService) {}
}
