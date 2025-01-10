// Inject all your environment variables here
/* eslint-disable no-process-env */
import 'dotenv/config'

export default {
  baseDir: process.cwd(),
  PORT: process.env.PORT || 3030,
  NODE_ENV: process.env.NODE_ENV || 'development',
  kafka: {
    url: process?.env?.KAFKA_URL,
    host: process?.env?.KAFKA_HOST,
    port: process?.env?.KAFKA_PORT,
  }
};
