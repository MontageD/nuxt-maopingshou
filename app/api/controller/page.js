import { postLinxApi, getLinxApi } from '../util/linxApi';

const getStaticPage = async (page) => {
  const url = '/v1/page/site/staticpage';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      page,
    },
    cache: true,
    cachTTL: 60 * 60,
  });
  return res;
};

module.exports = { getStaticPage };
