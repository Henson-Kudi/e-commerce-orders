import { Order } from '../../domain/entities';
import { ResponseCodes } from '../../domain/enums/responseCode';
import ErrorClass from '../../domain/valueObjects/error';
import { IReturnValue } from '../../domain/valueObjects/returnValue';
import IMessageBroker from '../providers/messageBroker';
import IOrdersRepository from '../repositories';
import IUseCase from './protocol';
import { orderDeleted } from '../../utils/kafkaTopics.json';
import logger from '../../utils/logger';

export default class DeleteOrderUseCase
  implements IUseCase<string, Promise<IReturnValue<Order | null>>>
{
  constructor(
    private readonly orderRepository: IOrdersRepository,
    private readonly messagebroker: IMessageBroker
  ) {}

  async execute(id: string): Promise<IReturnValue<Order | null>> {
    const found = await this.orderRepository.findOrderById(id);

    if (!found)
      return {
        success: false,
        message: 'Order not found',
        data: null,
        error: new ErrorClass(
          'Order with given id not found',
          ResponseCodes.BadRequest
        ),
      };

    const deleted = await this.orderRepository.deleteOrder(id);

    // Publish message
    try {
      this.messagebroker.publish({
        topic: orderDeleted,
        message: JSON.stringify(deleted),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return {
      data: deleted,
      success: true,
      message: 'Order deleted successfully',
    };
  }
}
