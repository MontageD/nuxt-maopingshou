import { postLinxApi, getLinxApi } from '../util/linxApi';
const getReviews = async (game_id, page, sort, headers) => {
  let url = '/v1/game/detail/reviewlist';

  if (!headers.authorization) {
    url = '/v1/game/detail/publicreviewlist';
  }
  const res = await getLinxApi({
    url,
    headers,
    params: {
      page: page,
      game_id: game_id,
      sorting: sort,
    },
  });
  return res;
};

const postReviews = async (
  game_id,
  { content = '', rating = 1, user_id = '' },
  headers
) => {
  const url = '/v1/game/detail/createreview';
  const res = await postLinxApi({
    url,
    headers,
    params: {
      content,
      rating,
      user_id,
      game_id,
    },
  });
  return res;
};

const vote = async (review_id, vote_direction, headers) => {
  const url = '/v1/game/detail/vote';
  const res = await postLinxApi({
    url,
    headers,
    params: {
      review_id,
      vote_direction,
    },
  });
  return res;
};

module.exports = { getReviews, postReviews, vote };
