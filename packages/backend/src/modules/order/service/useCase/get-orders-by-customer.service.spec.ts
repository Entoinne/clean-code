import { OrderStatusEnum } from "../../domain/model/const/order-status.enum";
import { GetOrdersByCustomerService } from "./get-orders-by-customer.service";



describe('get orders of the customer', () => {

  const orderMock =
  {
    createdAt: new Date('2023-10-22T10:00:00.000Z'),
    updatedAt: new Date('2023-10-22T12:00:00.000Z'),
    status: OrderStatusEnum.InCart,
    customer: 'Jean-Pierre',
    products: ['product1', 'product2'],
  };

  const orderRepositoryMock = {
    findOrdersByCustomer: () => orderMock,
  };

  it('shouldnt returns orders if name length inferior to 5 or have numeric in name', async () => {

    const getOrdersByCustomerService = new GetOrdersByCustomerService(orderRepositoryMock);

    await expect(getOrdersByCustomerService.getOrdersByCustomer('jean')).rejects.toThrow('Customer name must be at least 5 characters long');

  });

  it('shouldnt returns orders if name have numeric', async () => {

    const getOrdersByCustomerService = new GetOrdersByCustomerService(orderRepositoryMock);

    await expect(getOrdersByCustomerService.getOrdersByCustomer("Jean-Michel1")).rejects.toThrow("Customer name must not contain numbers");

  });

  it('should returns orders if name is valid', async () => {

    const getOrdersByCustomer = new GetOrdersByCustomerService(orderRepositoryMock);

    const returnValue = await getOrdersByCustomer.getOrdersByCustomer(orderMock.customer);

    expect(returnValue).toEqual(orderMock);
  });



});
