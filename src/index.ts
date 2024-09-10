import kafkaService from './application/services/kafkaService';
import startExpressServer from './presentation/express';
import kafkaMessageController from './presentation/http/controllers/kafka-controller';
import {
  stripePaymentSucceeded,
  codPaymentCreated,
  tabbyPaymentSucceeded,
  paymentUpdated,
} from './utils/kafkaTopics.json';

export default async function startServer() {
  startExpressServer();
  kafkaService.registerConsumers(
    [
      stripePaymentSucceeded,
      codPaymentCreated,
      tabbyPaymentSucceeded,
      paymentUpdated,
    ],
    kafkaMessageController
  );
}
