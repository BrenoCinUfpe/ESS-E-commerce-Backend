import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';

import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  imports: [PrismaModule],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
