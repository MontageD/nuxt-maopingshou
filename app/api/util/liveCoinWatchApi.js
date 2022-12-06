import axios from 'axios';

const getPrice = async function (now, from, code) {
  const res = await axios.post(
    'https://api.livecoinwatch.com/coins/single/history',
    {
      currency: 'USD',
      code: `${code}`,
      start: now - from,
      end: now,
      meta: true,
    },
    {
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.LIVE_COIN_WATCH_KEY,
      },
    }
  );
  return res.data;
};

module.exports = {
  getPrice,
};
