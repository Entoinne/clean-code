import { OrderRepositoryInterface } from "../../domain/port/db/repository/order.repository.interface";

export class ChangeStatusOrderToPaidService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) {
    }
    async changeStatusOrderToPaid(orderId: string): Promise<any> {
        await this.orderRepository.changeStatusOrderToPaid(orderId);
    }
}