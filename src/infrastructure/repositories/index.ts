import { Prisma } from '@prisma/client';
import IOrdersRepository from '../../application/repositories';
import { Order } from '../../domain/entities';

import database from '../database';
import { FindOrdersOptions } from '../../domain/dtos';

// Implementation of all database repositories defined in application/repositories
export default class OrdersRepository implements IOrdersRepository {
  createOrder(data: Prisma.OrderCreateArgs): Promise<Order> {
    return database.order.create(data);
  }

  countOrders(params: Prisma.OrderCountArgs): Promise<number> {
    return database.order.count(params);
  }

  findOrderById(
    id: string,
    options: FindOrdersOptions = { withItems: true, withShippingAddress: true }
  ): Promise<Order | null> {
    return database.order.findUnique({
      where: { id },
      include: {
        orderItems: options.withItems !== false,
        shippingAddress: options.withShippingAddress !== false,
      },
    });
  }

  findOrders(query: Prisma.OrderFindManyArgs): Promise<Order[]> {
    return database.order.findMany(query);
  }

  updateOrder(data: Prisma.OrderUpdateArgs): Promise<Order> {
    return database.order.update(data);
  }

  deleteOrder(id: string): Promise<Order> {
    return database.order.delete({ where: { id } });
  }

  deleteOrders(
    params: Prisma.OrderDeleteManyArgs
  ): Promise<Prisma.BatchPayload> {
    return database.order.deleteMany(params);
  }
}
