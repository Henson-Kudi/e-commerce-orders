import { FindOrdersOptions } from '../../domain/dtos';
import { Order } from '../../domain/entities';
import { ResponseCodes } from '../../domain/enums/responseCode';
import ErrorClass from '../../domain/valueObjects/error';
import { IReturnValue } from '../../domain/valueObjects/returnValue';
import IOrdersRepository from '../repositories';
import IUseCase from './protocol';

export default class GetOrderUseCase
  implements
    IUseCase<
      { id: string; options: FindOrdersOptions },
      Promise<IReturnValue<Order>>
    >
{
  private orderRepository: IOrdersRepository;
  constructor(orderRepository: IOrdersRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(params: {
    id: string;
    options: FindOrdersOptions;
  }): Promise<IReturnValue<Order>> {
    const order = await this.orderRepository.findOrderById(params.id, {
      withItems: params.options.withItems !== false,
      withShippingAddress: params.options.withShippingAddress !== false,
    });

    if (!order) {
      throw new ErrorClass('Order not found', ResponseCodes.BadRequest);
    }

    return {
      data: order,
      success: true,
      message: 'Order found',
    };
  }
}
