import { postLinxApi, getLinxApi } from '../util/linxApi';

const getBanner = async (params) => {
  const url = '/v1/banner/info/getbanner';
  const res = await getLinxApi({
    url,
    headers: {},
    params,
  });
  return res;
};

const getGames = async (headers) => {
  const url = '/v1/game/gameforyou/getgames';
  const res = await getLinxApi({
    url,
    headers,
    params: null,
  });
  return res;
};
const getRecent = async () => {
  const url = '/v1/game/all/newrelease';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
  });
  return res;
};
const getNews = async () => {
  const url = '/v1/discover/info/news';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
  });
  return res;
};

const getUpcoming = async () => {
  const url = '/v1/discover/info/upcominggames';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
  });
  return res;
};
const getRecentlyupdated = async () => {
  const url = '/v1/discover/info/recentlyupdated';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
  });
  return res;
};

module.exports = {
  getBanner,
  getGames,
  getRecent,
  getNews,
  getUpcoming,
  getRecentlyupdated,
};
