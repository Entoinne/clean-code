import { RepositoryInterface } from "@src/modules/shared/domain/port/db/repository.interface";
import Order from "./model/entity/order.orm-entity";
import { CreateOrderDtoInterface } from "./model/dto/create-order.dto.interface";

export interface OrderRepositoryInterface extends RepositoryInterface {
    getAllOrders(): Promise<Order[]>;
    findOrdersBeforeDate(date: string): Promise<Order[]>;
    findOrdersAfterDate(date: string): Promise<Order[]>;
    findOrdersByCustomer(customer: string): Promise<Order[]>;
    createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order>;
    changeStatusOrderToPaid(id: string): Promise<Order>;
    changeStatusOrderToCanceled(id: string): Promise<Order>;
    deleteOrderById(id: string): Promise<Order>;
}