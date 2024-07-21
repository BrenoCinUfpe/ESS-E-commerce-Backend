import { AutoMap } from '@automapper/classes';
import { OrderStatus, StatusEnum } from '@prisma/client';

export class TOrderPagination {
  @AutoMap()
  id: string;

  @AutoMap()
  createdAt: Date | any;

  @AutoMap()
  updatedAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  status: OrderStatus;
}
