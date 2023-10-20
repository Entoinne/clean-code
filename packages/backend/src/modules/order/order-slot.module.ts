import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/useCase/get-all-orders.service';
import { GetOrdersBeforeDateService } from './domain/service/useCase/get-orders-before-date.service';
import { GetOrdersAfterDateService } from './domain/service/useCase/get-orders-after-date.service';
import { GetOrdersByCustomerService } from './domain/service/useCase/get-orders-by-customer.service';
import { CreateOrderService } from './domain/service/useCase/create-order.service';
import { ChangeStatusOrderToPaidService } from './domain/service/useCase/change-order-status-to-paid.service';
import { ChangeStatusOrderToCanceledService } from './domain/service/useCase/change-order-status-to-cancel.service';
import { DeleteOrderByIdService } from './domain/service/useCase/delete-order-by-id.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepository) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersBeforeDateService,
      useFactory: (orderRepository: OrderRepository) => {
        return new GetOrdersBeforeDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersAfterDateService,
      useFactory: (orderRepository: OrderRepository) => {
        return new GetOrdersAfterDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepository) => {
        return new GetOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    }
    ,
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepository) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    }
    ,
    {
      provide: ChangeStatusOrderToPaidService,
      useFactory: (orderRepository: OrderRepository) => {
        return new ChangeStatusOrderToPaidService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    }
    ,
    {
      provide: ChangeStatusOrderToCanceledService,
      useFactory: (orderRepository: OrderRepository) => {
        return new ChangeStatusOrderToCanceledService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    }
    ,
    {
      provide: DeleteOrderByIdService,
      useFactory: (orderRepository: OrderRepository) => {
        return new DeleteOrderByIdService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    }
  ],
})
export default class OrderModule { }
