import { Injectable } from '@nestjs/common';
import { OrderStatus, RoleEnum, StatusEnum } from '@prisma/client';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { CrudType } from 'src/utils/base/ICrudTypeMap';
import { Paginated } from 'src/utils/base/IPaginated';
import { Paginator } from 'src/utils/paginator';

import { TOrderPagination } from './dto/type/order.pagination';
import { OrderEntity } from './entity/order.entity';
import { OrderTypeMap } from './entity/order.type.map';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFilteredAsync(
    filter: DefaultFilter<OrderTypeMap>,
  ): Promise<Paginated<TOrderPagination>> {
    const AND: Record<string, any>[] = [
      {
        status: {
          not: OrderStatus.CANCELED,
        },
      },
    ];

    if (filter.search) {
      filter.search = filter.search.trim();

      AND.push({
        OR: [],
      });
    }

    const prismaSelect: OrderTypeMap[CrudType.SELECT] = {
      id: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    };

    return await Paginator.applyPagination(this.prisma.order, {
      ...filter,
      where: { AND: filter.query },
      select: prismaSelect,
    });
  }

  async updateAsync(
    id: number,
    data: OrderTypeMap[CrudType.UPDATE],
  ): Promise<Order> {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async findBy(
    where: OrderTypeMap[CrudType.WHERE],
    select: OrderTypeMap[CrudType.SELECT],
    orderBy?: OrderTypeMap[CrudType.ORDER_BY],
  ) {
    return await this.prisma.order.findFirst({
      where,
      select,
      orderBy,
    });
  }

  async findByIdAsync(id: number): Promise<OrderEntity> {
    return await this.prisma.order.findUnique({
      where: {
        id,
        status: {
          not: OrderStatus.CANCELED,
        },
      },
    });
  }

  async deleteAsync(id: number): Promise<void> {
    await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.CANCELED,
      },
    });
  }

  async createAsync(data: OrderTypeMap[CrudType.CREATE]): Promise<OrderEntity> {
    return await this.prisma.order.create({
      data: {
        ...data,
      },
    });
  }

  async exists(where: OrderTypeMap[CrudType.WHERE]) {
    const order = await this.prisma.order.count({
      where,
    });

    return order > 0;
  }
}
