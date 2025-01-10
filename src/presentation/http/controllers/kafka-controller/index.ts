import { Message } from 'node-rdkafka';
import kafkaService from '../../../../application/services/kafkaService';
import {subscriptions} from '../../../../utils/kafkaTopics.json';

export default async function kafkaMessageController(
  message: Message
): Promise<void> {
  await kafkaService.handlePaymentMadeEvent(message);
  // switch (message.topic) {
  //   case paymentSuccess:
  //   case paymentCreated:
  //   case paymentUpdated:
  //   case paymentUpdated:
  //   case paymentUpdated:
  //     break;

  //   default:
  //     logger.warn(`No handler for topic: ${message.topic}`);
  //     break;
  // }
}
