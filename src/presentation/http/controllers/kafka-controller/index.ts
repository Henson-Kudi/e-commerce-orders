import { Message } from 'node-rdkafka';
import logger from '../../../../utils/logger';
import kafkaService from '../../../../application/services/kafkaService';
import {
  stripePaymentSucceeded,
  codPaymentCreated,
  tabbyPaymentSucceeded,
  paymentUpdated,
} from '../../../../utils/kafkaTopics.json';

export default async function kafkaMessageController(
  message: Message
): Promise<void> {
  switch (message.topic) {
    case stripePaymentSucceeded:
    case codPaymentCreated:
    case tabbyPaymentSucceeded:
    case paymentUpdated:
      await kafkaService.handlePaymentMadeEvent(message);
      break;

    default:
      logger.warn(`No handler for topic: ${message.topic}`);
      break;
  }
}
