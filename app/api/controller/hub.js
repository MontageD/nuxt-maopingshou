import { postLinxApi, getLinxApi } from '../util/linxApi';

const getAll = async (page, tag_id) => {
  const url = '/v1/community/hubs';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      page,
      tagid: tag_id,
    },
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

const getRecent = async () => {
  const url = '/v1/community/hubs/recent';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

const getFilters = async (display_section) => {
  const url = '/v1/community/hubs/filters';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      display_section,
    },
    cache: true,
    cacheTTL: 60 * 60 * 24,
  });
  return res;
};

const getFeature = async () => {
  const url = '/v1/community/hubs/featured';
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
  getAll,
  getRecent,
  getFilters,
  getFeature,
};
