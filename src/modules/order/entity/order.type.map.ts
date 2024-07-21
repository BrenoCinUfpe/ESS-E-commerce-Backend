import { Prisma } from '@prisma/client';

export class OrderTypeMap implements OrderTypeMap {
  aggregate: Prisma.OrderAggregateArgs;
  count: Prisma.OrderCountArgs;
  create: Prisma.OrderCreateInput;
  createUnchecked: Prisma.OrderUncheckedCreateInput;
  delete: Prisma.OrderDeleteArgs;
  deleteMany: Prisma.OrderDeleteManyArgs;
  findFirst: Prisma.OrderFindFirstArgs;
  findMany: Prisma.OrderFindManyArgs;
  findUnique: Prisma.OrderFindUniqueArgs;
  update: Prisma.OrderUpdateInput;
  updateMany: Prisma.OrderUpdateManyArgs;
  upsert: Prisma.OrderUpsertArgs;
  where: Prisma.OrderWhereInput;
  select: Prisma.OrderSelect;
  orderBy: Prisma.OrderOrderByWithRelationInput;
}
