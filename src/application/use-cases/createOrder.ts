import { CreateOrderDTO } from '../../domain/dtos';
import { Order } from '../../domain/entities';
import { IReturnValue } from '../../domain/valueObjects/returnValue';
import { validateCreateOrder } from '../../utils/joi';
import logger from '../../utils/logger';
import IMessageBroker from '../providers/messageBroker';
import IOrdersRepository from '../repositories';
import IUseCase from './protocol';
import { orderCreated } from '../../utils/kafkaTopics.json';

export default class CreateOrderUseCase
  implements IUseCase<CreateOrderDTO, Promise<IReturnValue<Order>>>
{
  constructor(
    private readonly orderRepository: IOrdersRepository,
    private readonly messageBroker: IMessageBroker
  ) {}
  async execute(data: CreateOrderDTO): Promise<IReturnValue<Order>> {
    await validateCreateOrder(data);

    // if data is valid, attempt createion of order
    const created = await this.orderRepository.createOrder({
      data: {
        ...data,
        shippingAddress: {
          create: data.shippingAddress,
        },
        orderItems: {
          create: data.orderItems,
        },
      },
    });

    // Publish message of order created
    try {
      await this.messageBroker.publish({
        topic: orderCreated,
        message: JSON.stringify(created),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return {
      success: true,
      data: created,
    };
  }
}
