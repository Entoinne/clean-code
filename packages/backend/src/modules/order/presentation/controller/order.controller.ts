import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import Order from '../../domain/model/entity/order.orm-entity';
import { GetAllOrdersService } from '../../domain/service/useCase/get-all-orders.service';
import { GetOrdersBeforeDateService } from '../../domain/service/useCase/get-orders-before-date.service';
import { GetOrdersAfterDateService } from '../../domain/service/useCase/get-orders-after-date.service';
import { GetOrdersByCustomerService } from '../../domain/service/useCase/get-orders-by-customer.service';
import { CreateOrderService } from '../../domain/service/useCase/create-order.service';
import { ChangeStatusOrderToPaidService } from '../../domain/service/useCase/change-order-status-to-paid.service';
import { ChangeStatusOrderToCanceledService } from '../../domain/service/useCase/change-order-status-to-cancel.service';
import { DeleteOrderByIdService } from '../../domain/service/useCase/delete-order-by-id.service';
import { CreateOrderDtoInterface } from '../../domain/model/dto/create-order.dto.interface';
@Controller('/orders')
export default class OrderController {
    constructor(
        private readonly getAllOrdersService: GetAllOrdersService,
        private readonly getOrdersBeforeDateService: GetOrdersBeforeDateService,
        private readonly getOrdersAfterDateService: GetOrdersAfterDateService,
        private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
        private readonly createOrderService: CreateOrderService,
        private readonly changeStatusOrderToPaidService: ChangeStatusOrderToPaidService,
        private readonly changeStatusOrderToCanceledService: ChangeStatusOrderToCanceledService,
        private readonly deleteOrderByIdService: DeleteOrderByIdService
    ) { }

    //get all orders
    @Get('/all')
    async getAllOrders(): Promise<Order[]> {
        return await this.getAllOrdersService.getAllOrders();
    }

    @Get('/before-date/:date')
    async getOrdersBeforeDate(@Param('date') date: string): Promise<Order[]> {
        return await this.getOrdersBeforeDateService.getOrdersBeforeDate(date);
    }

    @Get('/after-date/:date')
    async getOrdersAfterDate(@Param('date') date: string): Promise<Order[]> {
        return await this.getOrdersAfterDateService.getOrdersAfterDate(date);
    }

    @Get('/:customer')
    async getOrdersByCustomer(@Param('customer') customer: string): Promise<Order[]> {
        return await this.getOrdersByCustomerService.getOrdersByCustomer(customer);
    }

    @Post()
    async addOrder(@Body() createOrderDto: CreateOrderDtoInterface): Promise<Order> {
        return (await this.createOrderService.createOrder(createOrderDto)) as Order;
    }

    @Patch('/update/:id/paid')
    async changeStatusOrderToPaid(@Param('id') id: string): Promise<Order> {
        return await this.changeStatusOrderToPaidService.changeStatusOrderToPaid(id);
    }

    @Patch('/update/:id/canceled')
    async changeStatusOrderToCanceled(@Param('id') id: string): Promise<Order> {
        return await this.changeStatusOrderToCanceledService.changeStatusOrderToCanceled(id);
    }

    @Delete('/delete/:id')
    async deleteOrder(@Param('id') id: string): Promise<Order> {
        return await this.deleteOrderByIdService.deleteOrderById(id);
    }
}
