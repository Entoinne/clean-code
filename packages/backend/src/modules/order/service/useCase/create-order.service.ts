import { CreateOrderDtoInterface } from "../../domain/model/dto/create-order.dto.interface";
import Order from "../../domain/model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../domain/port/db/repository/order.repository.interface";

export class CreateOrderService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order> {
        const newOrder = await this.orderRepository.createOrder(createOrderDto);
        return newOrder as Order;
    }
}