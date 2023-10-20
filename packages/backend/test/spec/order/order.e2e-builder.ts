import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';
import { CreateOrderDtoInterface } from '@src/modules/order/domain/model/dto/create-order.dto.interface';

const orderCreateDefaultData: CreateOrderDtoInterface = {
  createdAt: new Date('2023-10-22T10:00:00.000Z'),
  updatedAt: new Date('2023-10-22T12:00:00.000Z'),
  status: OrderStatusEnum.InCart,
  customer: 'customer',
  products: ['product1', 'product2'],
};

export const orderBuilder = (orderCreateData: CreateOrderDtoInterface = orderCreateDefaultData) => {
  return {
    withCreatedAt: (createdAt: CreateOrderDtoInterface['createdAt']) => {
      return orderBuilder({
        ...orderCreateData,
        createdAt,
      });
    },

    withEndDate: (updatedAt: CreateOrderDtoInterface['updatedAt']) => {
      return orderBuilder({
        ...orderCreateData,
        updatedAt,
      });
    },

    withStatus: (status: CreateOrderDtoInterface['status']) => {
      return orderBuilder({
        ...orderCreateData,
        status,
      });
    },

    withProducts: (products: CreateOrderDtoInterface['products']) => {
      return orderBuilder({
        ...orderCreateData,
        products,
      });
    },

    withCustomer: (customer: CreateOrderDtoInterface['customer']) => {
      return orderBuilder({
        ...orderCreateData,
        customer,
      });
    },

    build() {
      return orderCreateData;
    },
  };
};
