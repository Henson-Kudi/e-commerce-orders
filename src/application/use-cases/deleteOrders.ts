import { FindOrdersFilter } from '../../domain/dtos';
import { IReturnValue } from '../../domain/valueObjects/returnValue';
import logger from '../../utils/logger';
import IMessageBroker from '../providers/messageBroker';
import IOrdersRepository from '../repositories';
import setupOdersQuery from './helpers';
import IUseCase from './protocol';
import { ordersDeleted } from '../../utils/kafkaTopics.json';

export default class DeleteOrdersUseCase
  implements
    IUseCase<FindOrdersFilter, Promise<IReturnValue<{ count: number }>>>
{
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly messageBroker: IMessageBroker
  ) {}

  async execute(
    params: FindOrdersFilter
  ): Promise<IReturnValue<{ count: number }>> {
    const query = setupOdersQuery(params);
    const deleted = await this.ordersRepository.deleteOrders({ where: query });

    // Publish message of orders deleted
    try {
      await this.messageBroker.publish({
        topic: ordersDeleted,
        message: JSON.stringify(deleted),
      });
    } catch (err) {
      logger.error((err as Error).message, err);
    }

    return {
      success: true,
      data: deleted,
    };
  }
}
