import { postLinxApi, getLinxApi } from '../util/linxApi';

const getAll = async (params) => {
  const url = '/v1/game/all/gamelist';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      keyword: params.keyword.trim(),
      p2e_type: params.p2e_type ? params.p2e_type : '',
      release_status: params.release_status ? params.release_status : '',
      genres: params.genres ? params.genres : '',
      tags: params.tags ? params.tags : '',
      platforms: params.platforms ? params.platforms : '',
      sorting: params.sorting,
      page: params.page,
    },
    // cache: true,
    // cacheTTL: 60 * 5,
  });
  return res;
};

const getForYou = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};

const getRecentlyUpdated = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};

const getNewRelease = async () => {
  const url = '/v1/game/all/newrelease';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {},
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

const getUpcoming = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};
const getFilter = async () => {
  const url = '/v1/game/all/filterlist';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {},
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};
const getRecentlyPlayed = async (params, headers) => {
  const url = '/v1/game/play/userplayedgametoken';
  const res = await getLinxApi({
    url,
    headers,
    params,
    cache: false,
  });
  return res;
};

const getOwned = async (params, headers) => {
  const url = '/v1/game/play/ownedgame';
  const res = await getLinxApi({
    url,
    headers,
    params,
    cache: false,
  });
  return res;
};
const getPlaynext = async (params, headers) => {
  const url = '/v1/game/play/next';
  const res = await getLinxApi({
    url,
    headers,
    params,
    cache: false,
  });
  return res;
};

const getUserlastestnews = async (params, headers) => {
  const url = '/v1/game/play/userlatestnews';
  const res = await getLinxApi({
    url,
    headers,
    params,
    cache: false,
  });
  return res;
};

const getGameInfo = async (game_id) => {
  const url = '/v1/game/detail/';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      game_id: game_id,
    },
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

module.exports = {
  getAll,
  getForYou,
  getRecentlyUpdated,
  getUpcoming,
  getNewRelease,
  getFilter,
  getRecentlyPlayed,
  getOwned,
  getPlaynext,
  getUserlastestnews,
  getGameInfo,
};
