// const redis = require('redis');
// var retryStrategy = require('node-redis-retry-strategy');

const getRedisClient = async function (success, fallback) {
  // const url = `redis://${process.env.REDIS_AUTH}${
  //   process.env.REDIS_AUTH == '' ? '' : '@'
  // }${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`;
  // const client = redis.createClient({
  //   url,
  //   retry_strategy: retryStrategy({
  //     wait_time: 1000,
  //   }),
  // });

  // try {
  //   await client.connect();
  // } catch (e) {
  //   return null;
  // }

  // return client;
};
module.exports = { getRedisClient };
