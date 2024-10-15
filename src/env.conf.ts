// Inject all your environment variables here
/* eslint-disable no-process-env */
export default {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
