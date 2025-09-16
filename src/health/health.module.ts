import { Module, Controller, Get } from '@nestjs/common';
import {
  TerminusModule,
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  // Combined health (readiness + basic resource checks)
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      // Fail if heap usage > 300 MB
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
    ]);
  }

  // Kubernetes-style readiness probe (depends on external resources)
  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }

  // Kubernetes-style liveness probe (process is alive)
  @Get('live')
  @HealthCheck()
  liveness() {
    return this.health.check([]);
  }
}

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
