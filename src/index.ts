import kafkaService from './application/services/kafkaService';
import startExpressServer from './presentation/express';
import kafkaMessageController from './presentation/http/controllers/kafka-controller';
import {
  subscriptions
} from './utils/kafkaTopics.json';
import 'dotenv/config'

export default async function startServer() {
  startExpressServer();

  kafkaService.registerConsumers(
    [
      ...Object.values(subscriptions)
    ],
    kafkaMessageController
  );
}
