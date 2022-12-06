import { getLinxApi } from '../util/linxApi';
const getBanner = async () => {
  const url = '/v1/banner/info/getbanner';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      page: 'event',
    },
    cache: true,
    cacheTTL: 300,
  });
  return res;
};

module.exports = { getBanner };
