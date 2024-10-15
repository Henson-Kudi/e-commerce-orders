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
  implements IUseCase<CreateOrderDTO, Promise<IReturnValue<Order>>> {
  constructor(
    private readonly orderRepository: IOrdersRepository,
    private readonly messageBroker: IMessageBroker
  ) { }
  async execute(data: CreateOrderDTO): Promise<IReturnValue<Order>> {
    await validateCreateOrder(data);
    // get lat order and use it to create a reference number
    const lastOrder = await this.orderRepository.findLastOrder();

    const newRefNumber = `OR${(lastOrder ? lastOrder.serialNumber + 1 : 1).toString().padStart(6, '0')}`;

    // if data is valid, attempt createion of order
    const created = await this.orderRepository.createOrder({
      data: {
        ...data,
        refNumber: newRefNumber,
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
      this.messageBroker.publish({
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
