import { Controller } from '@nestjs/common';
import {
  Body,
  Post,
  Delete,
  Patch,
  Res,
  Param,
  Get,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { RoleEnum } from '@prisma/client';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { ProductCreateDto } from 'src/modules/product/dto/request/product.create.dto';
import { ProductUpdateDto } from 'src/modules/product/dto/request/product.update.dto';
import {
  ApiExceptionResponse,
  ApiOkResponsePaginated,
} from 'src/utils/swagger-schemas/SwaggerSchema';

import { ProductResponseDto } from './dto/response/product.dto';
import { ProductPaginationResponse } from './dto/response/product.pagination.response';
import { ProductTypeMap } from './entity/product.type.map';
import { ProductService } from './product.service';

@ApiBearerAuth()
@Controller('Product')
@ApiTags('Product')
export class ProductController {
  constructor(protected readonly ProductService: ProductService) {}

  @ApiOperation({ summary: 'Create item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductResponseDto,
  })
  @ApiExceptionResponse()
  @Post()
  @Roles(RoleEnum.ADMIN)
  async create(@Res() response: Response, @Body() body: ProductCreateDto) {
    const item = await this.ProductService.createItem(body);

    return response.status(HttpStatus.CREATED).json(item);
  }

  @ApiOperation({ summary: 'Update item by ID' })
  @ApiParam({
    name: 'itemId',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
  })
  @ApiExceptionResponse()
  @Patch('/:itemId')
  @Roles(RoleEnum.ADMIN)
  async update(
    @Res() response: Response,
    @Param('itemId') itemId: number,
    @Body() body: ProductUpdateDto,
  ) {
    const updatedItem = await this.ProductService.updateItem(itemId, body);

    return response.status(HttpStatus.OK).json(updatedItem);
  }

  @ApiOperation({ summary: 'Get filtered product' })
  @ApiOkResponsePaginated(ProductPaginationResponse)
  @ApiExceptionResponse()
  @Get()
  @Roles(RoleEnum.ADMIN)
  async getFilteredAsync(
    @Res() response: Response,
    @Query() filter: DefaultFilter<ProductTypeMap>,
  ) {
    const filteredData = await this.ProductService.findFilteredAsync(filter);

    return response.status(HttpStatus.OK).json(filteredData);
  }

  @Get('/:itemId')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({
    name: 'itemId',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductResponseDto,
  })
  @ApiExceptionResponse()
  @Roles(RoleEnum.ADMIN)
  async getById(@Res() response: Response, @Param('itemId') itemId: number) {
    const item = await this.ProductService.getItemById(itemId);

    return response.status(HttpStatus.OK).json(item);
  }

  @ApiOperation({ summary: 'Delete item by ID' })
  @ApiParam({
    name: 'itemId',
    type: Number,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item successfully deleted',
  })
  @ApiExceptionResponse()
  @Delete('/:itemId')
  @Roles(RoleEnum.ADMIN)
  async delete(@Res() response: Response, @Param('itemId') itemId: number) {
    await this.ProductService.deleteItem(itemId);

    return response.status(HttpStatus.OK).json({
      message: 'Item successfully deleted',
    });
  }
}
