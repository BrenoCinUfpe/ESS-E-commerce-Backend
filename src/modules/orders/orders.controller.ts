import { Controller, Post, Body } from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    return this.ordersService.createOrder(orderData);
  }
}
