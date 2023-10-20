import { OrderRepositoryInterface } from "../../order.repository.interface";

export class GetOrdersByCustomerService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface
    ) { }

    async getOrdersByCustomer(customer: string): Promise<any> {
        if (customer.length < 5) { throw new Error("Customer name must be at least 5 characters long") }
        if (/[0-9]/.test(customer)) { throw new Error("Customer name must not contain numbers") }
        const orders = await this.orderRepository.findOrdersByCustomer(customer);
        return orders;
    }
}