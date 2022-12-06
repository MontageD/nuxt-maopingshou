import { getPrice } from '../util/liveCoinWatchApi';

import { getRedisClient } from '../util/linxRedis';

const getPriceTrend = async (ticker) => {
  function getNow() {
    const now = new Date();
    return now.getTime();
  }

  let listOfCrypto = ['BTC', 'ETH', 'BNB'];
  // const from = 24 * 60 * 60 * 1000;
  const from = 7 * 24 * 60 * 60 * 1000;
  if (ticker) {
    listOfCrypto = [ticker.toUpperCase()];
  }

  const result = [];

  const redisClient = await getRedisClient();
  if (redisClient == null) {
    return { status: 1, data: result, message: 'Success' };
  }
  for (const crypto of listOfCrypto) {
    try {
      const redisKeyPrice = `${process.env.REDIS_PREFIX}:crypto:prices:${crypto}`;
      const redisKeyLastUpdated = `${process.env.REDIS_PREFIX}:crypto:updated_at:${crypto}`;
      let emptyPriceList = true;
      let lastUpdatedIsExpired = true;
      emptyPriceList = (await redisClient.exists(redisKeyPrice)) == 0;
      lastUpdatedIsExpired = !(await redisClient.exists(redisKeyLastUpdated));
      if (emptyPriceList || lastUpdatedIsExpired || redisClient == null) {
        const res = await getPrice(getNow(), from, crypto);
        const oldest = res.history[0];
        const twenty_four_hr_ago = res.history[res.history.length - 1 - 12];
        const latest = res.history.pop();
        const trend_24_h = latest.rate - twenty_four_hr_ago.rate;
        const trend_7_d = latest.rate - oldest.rate;
        const info = {
          ticker: crypto,
          name: res.name,
          price: latest.rate,
          price_trend_7_d: trend_7_d,
          price_trend: trend_24_h,
          date: latest.date,
          image_url: res.png64,
          color: res.color,
          symbol: res.symbol,
          history: res.history.map((item) => item.rate),
        };
        result.push(info);
        if (redisClient != null) {
          await redisClient.set(redisKeyPrice, JSON.stringify(info));
          await redisClient.set(redisKeyLastUpdated, getNow(), {
            EX: 60 * 15, //second
          });
        }
      } else {
        result.push(JSON.parse(await redisClient.get(redisKeyPrice)));
      }
    } catch (e) {
      void 0;
    }
  }
  redisClient.quit();
  return { status: 1, data: result, message: 'Success' };
};

module.exports = { getPriceTrend };
