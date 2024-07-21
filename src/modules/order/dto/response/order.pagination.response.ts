import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class OrderPaginationResponse {
  @ApiResponseProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @AutoMap()
  id: string;

  @ApiResponseProperty({
    example: '03/11/2024',
  })
  @AutoMap()
  createdAt: Date | any;

  @ApiResponseProperty({
    example: '2021-01-01T00:00:00.000Z',
  })
  @AutoMap()
  updatedAt: Date;

  @ApiResponseProperty({
    example: 'ACTIVE',
    enum: OrderStatus,
  })
  @AutoMap()
  status: OrderStatus;
}
