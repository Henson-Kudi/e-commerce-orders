import IUseCase from '../protocol';
import { CreateOrderDTO, UpdateOrderDTO } from '../../../domain/dtos';
import ordersService from '../../services';
import logger from '../../../utils/logger';
import { Message } from 'node-rdkafka';

export class PaymentMadeConsumer implements IUseCase<Message, Promise<void>> {
  async execute(payload: Message): Promise<void> {
    try {
      if (!payload.value) {
        return;
      }

      const parsedValue = JSON.parse(payload.value.toString());

      const orderData: CreateOrderDTO = {
        currency: parsedValue?.currency,
        discount: parsedValue.discount,
        email: parsedValue.userEmail,
        name: parsedValue.userName,
        phone: parsedValue.userPhone,
        paymentId: parsedValue.paymentId,
        shippingAddress: parsedValue.shippingAddress,
        orderItems: parsedValue.orderItems,
        totalAmount: parsedValue.totalAmount,
        userId: parsedValue?.userId,
      };

      // If payload is parsed successfully, ensure that there is not already an order in the  system with that payment id
      const foundOrder = await ordersService.getOrders({
        filter: {
          paymentId: parsedValue.paymentId,
        },
      });

      if (foundOrder.data?.data.length) {
        // Update the order instead
        const order = foundOrder.data.data[0];

        await ordersService.updateOrder({
          id: order.id,
          data: orderData as UpdateOrderDTO,
        });
      } else {
        await ordersService.createOrder(orderData);
      }
    } catch (err) {
      logger.error((err as Error).message, err);
    }
  }
}
