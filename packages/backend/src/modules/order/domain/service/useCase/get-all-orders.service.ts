import { OrderRepositoryInterface } from "../../order.repository.interface";

export class GetAllOrdersService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async getAllOrders(): Promise<any> {
        const orders = await this.orderRepository.getAllOrders();
        return orders;
    }
}