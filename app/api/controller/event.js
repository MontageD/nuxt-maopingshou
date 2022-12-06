import { postLinxApi, getLinxApi } from '../util/linxApi';

const getEvent = async () => {
  const url = '/v1/event/info/';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60,
  });
  return res;
};

const getLatest = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};

const getEndingSoon = async () => {
  const url = '/v1/event/info/endingsoon';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60,
  });
  return res;
};

const getCompleted = async () => {
  const url = '/v1/event/info/completedevents';
  const res = await getLinxApi({
    url,
    headers: {},
    params: null,
    cache: true,
    cacheTTL: 60,
  });
  return res;
};

module.exports = { getEvent, getLatest, getEndingSoon, getCompleted };
