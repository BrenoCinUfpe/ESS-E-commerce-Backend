import { AutoMap } from '@automapper/classes';
import { ApiResponseProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class OrderResponseDto {
  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  id: string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  createdAt: Date | string;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  updatedAt: Date;

  @AutoMap()
  @ApiResponseProperty({
    type: String,
  })
  status: OrderStatus;
}
