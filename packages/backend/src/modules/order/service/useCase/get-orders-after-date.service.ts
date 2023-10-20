import Order from "../../domain/model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../domain/port/db/repository/order.repository.interface";

export class GetOrdersAfterDateService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async getOrdersAfterDate(date: string): Promise<Order[]> {
        const orders = await this.orderRepository.findOrdersAfterDate(date);
        return orders;
    }
}