import { Prisma } from '@prisma/client';
import { Order } from '../../domain/entities';
import { FindOrdersOptions } from '../../domain/dtos';

// Define interfaces for your repositories. How to communicate with your database
export default interface IOrdersRepository {
  createOrder(data: Prisma.OrderCreateArgs): Promise<Order>;
  countOrders(params: Prisma.OrderCountArgs): Promise<number>;

  findOrderById(id: string, options?: FindOrdersOptions): Promise<Order | null>;

  findOrders(data: Prisma.OrderFindManyArgs): Promise<Order[]>;

  updateOrder(data: Prisma.OrderUpdateArgs): Promise<Order | null>;

  deleteOrder(id: string): Promise<Order | null>;

  deleteOrders(
    params: Prisma.OrderDeleteManyArgs
  ): Promise<Prisma.BatchPayload>;
}
