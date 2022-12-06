import { postLinxApi, getLinxApi } from '../util/linxApi';

const getPopular = async () => {
  const url = '/v1/game/all/populargenres';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {},
  });
  return res;
};

module.exports = { getPopular };
