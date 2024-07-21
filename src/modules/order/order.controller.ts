import { Controller } from '@nestjs/common';
import { Delete, Get, Param, Query, Res, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import {
  ApiExceptionResponse,
  ApiOkResponsePaginated,
} from 'src/utils/swagger-schemas/SwaggerSchema';

import { OrderPaginationResponse } from './dto/response/order.pagination.response';
import { OrderTypeMap } from './entity/order.type.map';
import { OrderService } from './order.service';

@ApiBearerAuth()
@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(protected readonly service: OrderService) {}

  @ApiOperation({ summary: 'Get filtered order' })
  @ApiOkResponsePaginated(OrderPaginationResponse)
  @ApiExceptionResponse()
  @Get()
  @Roles(RoleEnum.ADMIN)
  async getFilteredAsync(
    @Res() response: Response,
    @Query() filter: DefaultFilter<OrderTypeMap>,
  ) {
    const filteredData = await this.service.findFilteredAsync(filter);

    return response.status(HttpStatus.OK).json(filteredData);
  }

  @ApiOperation({ summary: 'Cancel an order' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiExceptionResponse()
  @Delete('/:id')
  protected async cancelOrderAsync(
    @Res() response: Response,
    @Param('id') id: number,
  ) {
    await this.service.deleteAsync(id);

    return response.status(HttpStatus.OK).json({
      success: true,
      id: id,
      message: 'Order has been successfully canceled',
    });
  }
}
