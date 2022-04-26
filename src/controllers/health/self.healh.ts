import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError
} from '@nestjs/terminus';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class SelfHealthIndicator extends HealthIndicator {
  constructor(
    private prisma: PrismaService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = await this.prisma.nfts.count() >= 0;

    const result = this.getStatus('DB connection', isHealthy);

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Self check failed', result);
  }
}
