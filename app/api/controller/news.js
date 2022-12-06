import { postLinxApi, getLinxApi } from '../util/linxApi';

const getNewsList = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};

const getOwnedGamesNews = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};

const getTrendingToday = async () => {
  const url = '/v1/game/play/userlatestnews';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

// News Article
const getAllGames = async (params) => {
  const url = '/v1/news/info/getallnews';
  const res = await getLinxApi({
    url,
    headers: {},
    params,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

const getNews = async (params) => {
  const url = '/v1/news/info/getnews';
  const res = await getLinxApi({
    url,
    headers: {},
    params,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};
const getComments = async (params) => {
  const url = '/v1/news/info/getcomments';
  const res = await getLinxApi({
    url,
    headers: {},
    params,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};
const publicGetComments = async (params) => {
  const url = '/v1/news/info/publicgetcomments';
  const res = await getLinxApi({
    url,
    headers: {},
    params,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};
const createComments = async (params, headers) => {
  const url = '/v1/news/info/createcomments';
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};
const likeComment = async (params, headers) => {
  const url = '/v1/news/info/likeacomment';
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};
const unlikeComment = async (params, headers) => {
  const url = '/v1/news/info/unlikeacomment';
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};
const editComment = async (params, headers) => {
  const url = '/v1/news/info/editcomment';
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};
const likeanews = async (params, headers) => {
  const url = '/v1/news/info/likeanews';
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};
const unlikeanews = async (params, headers) => {
  const url = '/v1/news/info/unlikeanews';
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};
const trendingnews = async () => {
  const url = '/v1/news/info/trendingnews';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};
const getartilebanner = async () => {
  const url = '/v1/news/info/getartilebanner';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};
const featuredevent = async () => {
  const url = '/v1/news/info/featuredevent';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

module.exports = {
  getNewsList,
  getOwnedGamesNews,
  getTrendingToday,
  getAllGames,
  getNews,
  getComments,
  publicGetComments,
  createComments,
  likeComment,
  unlikeComment,
  editComment,
  likeanews,
  unlikeanews,
  trendingnews,
  getartilebanner,
  featuredevent,
};
