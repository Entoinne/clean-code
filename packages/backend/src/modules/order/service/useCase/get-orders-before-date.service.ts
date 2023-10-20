import Order from "../../domain/model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../domain/port/db/repository/order.repository.interface";

export class GetOrdersBeforeDateService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async getOrdersBeforeDate(date: string): Promise<Order[]> {
        const orders = await this.orderRepository.findOrdersBeforeDate(date);
        return orders;
    }
}