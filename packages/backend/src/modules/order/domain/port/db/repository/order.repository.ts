import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { CreateOrderDtoInterface } from '../../../model/dto/create-order.dto.interface';
import { OrderStatusEnum } from '../../../model/const/order-status.enum';
import { Inject } from '@nestjs/common';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';

export default class OrderRepository extends Repository<Order> {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,

    @Inject(OrmEntityToDomainEntityMapper)
    private readonly ormEntityToDomainEntityMapper: OrmEntityToDomainEntityMapper,
  ) {
    super(Order, datasource.createEntityManager());
  }

  async getAllOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    const orders = await query.getMany();

    return orders;
  }

  async findOrdersBeforeDate(date: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt <= :date', { date });

    const orders = await query.getMany();

    return orders;
  }

  async findOrdersAfterDate(date: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt >= :date', { date });

    const orders = await query.getMany();

    return orders;
  }

  async findOrdersByCustomer(customer: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.customer = :customer', { customer });

    const orders = await query.getMany();

    return orders;
  }

  async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<Order> {

    return (await this.save(createOrderDto)) as Order;
  }

  async changeStatusOrderToPaid(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');

    query.where('order.id = :id', { id });

    return (await query.update().set({ status: OrderStatusEnum.Paid }).execute()) as unknown as Order;
  }

  async changeStatusOrderToCanceled(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');

    query.where('order.id = :id', { id });

    return (await query.update().set({ status: OrderStatusEnum.Canceled }).execute()) as unknown as Order;
  }

  async deleteOrderById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');

    query.where('order.id = :id', { id });

    return await (query.delete().execute()) as unknown as Order;
  }


  private mapMentoringSlotOrmToMentoringSlot(orderOrm: Order): Order {
    const order = this.ormEntityToDomainEntityMapper.mapOrmEntityToDomainEntity<Order>(
      orderOrm,
      new Order(),
    );

    return order;
  }

  private mapMentoringSlotsOrmToMentoringSlots(orderOrm: Order[]): Order[] {
    return orderOrm.map((mentoringSlotOrm) => this.mapMentoringSlotOrmToMentoringSlot(mentoringSlotOrm));
  }
}
