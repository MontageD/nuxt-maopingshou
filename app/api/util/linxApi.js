import axios from 'axios';
import { getRedisClient } from '../util/linxRedis';

function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

const getLinxApi = async ({
  url,
  headers = {},
  params,
  cache = false,
  cacheTTL = 30, // second
}) => {
  const client = await getRedisClient();
  const auth = headers.authorization
    ? headers.authorization.replace('Bearer', '').trim()
    : 'noauth';
  const cacheKey = `${
    process.env.REDIS_PREFIX
  }:${url}:${auth}:${objectToQueryString(params)}`;
  if (cache && client != null) {
    if (await client.exists(cacheKey)) {
      const cacheRes = await client.get(cacheKey);
      return JSON.parse(cacheRes);
    }
  }

  const relayHeaders = {};
  if (headers.Authorization || headers.authorization) {
    relayHeaders.Authorization = headers.Authorization
      ? headers.Authorization
      : headers.authorization;
  }
  try {
    let apiRes = await axios.get(process.env.LINX_API_URL + url, {
      params: params,
      headers: relayHeaders,
    });
    apiRes = apiRes.data;

    if (cache && client != null) {
      client.set(cacheKey, JSON.stringify(apiRes), {
        EX: cacheTTL,
      });
      client.quit();
    }
    return apiRes;
  } catch (e) {
    if (e.response) {
      return {
        status: e.response.status,
        data: null,
        message: e.response.data.message,
      };
    } else {
      return {
        status: 500,
        data: null,
        message: e.message,
      };
    }
  }
};
const postLinxApi = async ({
  url,
  headers = {},
  params,
  cache = false,
  cacheTTL = 30, // second
}) => {
  if (process.env.MODE == 'dev') {
    console.log(`=> POST:${url}`);
  }
  const client = await getRedisClient();

  const auth = headers.authorization
    ? headers.authorization.replace('Bearer', '').trim()
    : 'noauth';
  const cacheKey = `${
    process.env.REDIS_PREFIX
  }:${url}:${auth}:${objectToQueryString(params)}`;

  if (cache && client != null) {
    if (await client.exists(cacheKey)) {
      const cacheRes = await client.get(cacheKey);
      return JSON.parse(cacheRes);
    }
  }
  const relayHeaders = {};
  if (headers.Authorization || headers.authorization) {
    relayHeaders.Authorization = headers.Authorization
      ? headers.Authorization
      : headers.authorization;
  }

  try {
    let apiRes = await axios.post(process.env.LINX_API_URL + url, params, {
      headers: relayHeaders,
    });
    apiRes = apiRes.data;
    if (cache && client != null) {
      if (apiRes != null && apiRes != []) {
        client.set(cacheKey, JSON.stringify(apiRes), {
          EX: cacheTTL,
        });
      }
      client.quit();
    }
    return apiRes;
  } catch (e) {
    if (e.response) {
      console.log(e.response);

      return {
        status: e.response.status,
        data: null,
        message: e.response.data.message,
      };
    } else {
      return {
        status: 500,
        data: null,
        message: e.message,
      };
    }
  }
};

module.exports = { getLinxApi, postLinxApi };
