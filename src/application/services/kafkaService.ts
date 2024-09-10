import { PaymentMadeConsumer } from '../use-cases/message-consumers/consumePaymentMade';
import { Message } from 'node-rdkafka';
import {
  MessageHandler,
  MessageSubscriptionParams,
} from '../../domain/dtos/messageBroker';
import messageBroker from '../../infrastructure/providers/messageBroker';

export class KafkaService {
  handlePaymentMadeEvent(payload: Message) {
    return new PaymentMadeConsumer().execute(payload);
  }

  registerConsumers(
    consumers: MessageSubscriptionParams,
    callback: MessageHandler
  ): void {
    messageBroker.subscribe(consumers, callback);
  }
}

const kafkaService = new KafkaService();

export default kafkaService;
