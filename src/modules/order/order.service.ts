import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { OrderStatus, Prisma, RoleEnum, StatusEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { CrudType } from 'src/utils/base/ICrudTypeMap';
import { Paginated } from 'src/utils/base/IPaginated';
import { isDevelopmentEnviroment } from 'src/utils/environment';
import { hashData } from 'src/utils/hash';
import {
  MessagesHelperKey,
  getMessage,
  setMessage,
} from 'src/utils/messages.helper';
import { handleError } from 'src/utils/treat.exceptions';

import { OrderPaginationResponse } from './dto/response/order.pagination.response';
import { TOrderPagination } from './dto/type/order.pagination';
import { OrderEntity } from './entity/order.entity';
import { OrderTypeMap } from './entity/order.type.map';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  private logger = new Logger(OrderService.name);

  constructor(
    protected readonly orderRepository: OrderRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  // TODO: INSERIR OS CAMPOS NECESSÁRIOS PARA GERAR UMA ORDEM
  // async createAsync(data: OrderTypeMap[CrudType.CREATE]): Promise<OrderEntity> {
  //   this.logger.log(`Create order`);

  //   try {
  //     if ((await this.exists({ id })) === true) {
  //       this.logger.debug(`Email already exists`);
  //       throw new ConflictException(
  //         getMessage(MessagesHelperKey.EMAIL_ALREADY_EXISTS),
  //       );
  //     }

  //     return await this.orderRepository.createAsync(data);
  //   } catch (error) {
  //     this.logger.debug(`Error on create order ${error}`);
  //     handleError(error);
  //   }
  // }

  async deleteAsync(id: number): Promise<void> {
    this.logger.log(`Delete order`);

    if (id == null) {
      this.logger.debug(`Id is required`);
      throw new BadRequestException(getMessage(MessagesHelperKey.ID_REQUIRED));
    }

    try {
      const orderExists = await this.exists({ id });

      if (!orderExists) {
        this.logger.debug(`Order ${id} not found`);
        throw new NotFoundException('Order does not exist');
      }

      const orderToBeDeleted = await this.orderRepository.findByIdAsync(id);

      if (orderToBeDeleted.status === OrderStatus.CANCELED) {
        throw new ForbiddenException('Order already canceled');
      }

      if (orderToBeDeleted.status === OrderStatus.CONCLUDED) {
        throw new ForbiddenException('Order cannot be canceled');
      }

      await this.orderRepository.deleteAsync(id);
    } catch (error) {
      this.logger.debug(`Error on delete ${error}`);

      handleError(error);
    }
  }

  async exists(where: OrderTypeMap[CrudType.WHERE]): Promise<boolean> {
    try {
      return await this.orderRepository.exists(where);
    } catch (error) {
      handleError(error);
    }
  }

  async findBy(
    where: OrderTypeMap[CrudType.WHERE],
    select: OrderTypeMap[CrudType.SELECT],
    optionals?: {
      orderBy?: OrderTypeMap[CrudType.ORDER_BY];
    },
  ): Promise<Partial<OrderEntity>> {
    try {
      this.logger.log(`Find by`);

      if ((await this.exists(where)) === false) {
        this.logger.debug(`order not found`);
        throw new NotFoundException(
          setMessage(getMessage(MessagesHelperKey.USER_NOT_FOUND), ''),
        );
      }

      const data = await this.orderRepository.findBy(
        where,
        select,
        optionals?.orderBy,
      );

      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async findFilteredAsync(
    filter: DefaultFilter<OrderTypeMap>,
  ): Promise<Paginated<Partial<OrderPaginationResponse>>> {
    try {
      this.logger.log(`Find filtered async`);

      const orderFiltered =
        await this.orderRepository.findFilteredAsync(filter);

      const orderFilteredDataMapped = this.mapper.mapArray(
        orderFiltered.data,
        TOrderPagination,
        OrderPaginationResponse,
      );

      return {
        ...orderFiltered,
        data: orderFilteredDataMapped,
      };
    } catch (error) {
      handleError(error);
    }
  }
}
