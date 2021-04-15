const Queue = require('bull');

const imageAiProcessor = require('./processors/image-ai');

const queueName = process.env.IMAGE_AI_QUEUE_NAME || 'image-ai';
const config = {
  redis: {
    port: process.env.REDIS_PORT || 6380,
    host: process.env.REDIS_HOST || 'localhost'
  }
};

const imageAiQueue = new Queue(queueName, config);

imageAiQueue.process(imageAiProcessor);
