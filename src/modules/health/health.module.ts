import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  providers: [],
  imports: [],
  exports: [HealthModule],
})
export class HealthModule {}
