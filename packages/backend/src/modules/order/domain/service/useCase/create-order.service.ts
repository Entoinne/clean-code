import { CreateOrderDtoInterface } from "../../model/dto/create-order.dto.interface";
import Order from "../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../order.repository.interface";


export class CreateOrderService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order> {
        const newOrder = await this.orderRepository.createOrder(createOrderDto);
        return newOrder as Order;
    }
}