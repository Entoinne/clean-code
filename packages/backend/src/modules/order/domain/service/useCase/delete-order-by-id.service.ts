import Order from "../../model/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../order.repository.interface";


export class DeleteOrderByIdService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) {
    }
    async deleteOrderById(orderId: string): Promise<Order> {
        const order = await this.orderRepository.deleteOrderById(orderId);
        return order;
    }
}