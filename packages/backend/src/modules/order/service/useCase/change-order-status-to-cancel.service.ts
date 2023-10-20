import { OrderRepositoryInterface } from "../../domain/port/db/repository/order.repository.interface";

export class ChangeStatusOrderToCanceledService {
    constructor(
        private readonly orderRepositoryInterface: OrderRepositoryInterface
    ) {
    }
    async changeStatusOrderToCanceled(orderId: string): Promise<any> {
        await this.orderRepositoryInterface.changeStatusOrderToCanceled(orderId);
    }
}