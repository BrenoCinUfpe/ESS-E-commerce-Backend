import { $Enums, Order } from '@prisma/client';

export class OrderEntity implements Order {
  id: number;
  code: string;
  price: number;
  userId: number;
  estimatedDelivery: Date;
  status: $Enums.OrderStatus;
  develiryAddressId: number;
  createdAt: Date;
  updatedAt: Date;
}
