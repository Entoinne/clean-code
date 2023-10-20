import { OrderRepositoryInterface } from "../../domain/port/db/repository/order.repository.interface";

export class GetAllOrdersService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async getAllOrders(): Promise<any> {
        const orders = await this.orderRepository.getAllOrders();
        return orders;
    }
}