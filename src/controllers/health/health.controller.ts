import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { SelfHealthIndicator } from './self.healh';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private selfHealth: SelfHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([async () => this.selfHealth.isHealthy()]);
  }
}
