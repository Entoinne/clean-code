import { CreateOrderDtoInterface } from "../domain/model/dto/create-order.dto.interface";

export class CreateOrderDto implements CreateOrderDtoInterface {
    createdAt: Date;
    updatedAt: Date;
    status: string;
    customer: string;
    products: string[];
}