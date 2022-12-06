import { postLinxApi, getLinxApi } from '../util/linxApi';

const getCategories = async (game_id) => {
  const url = '/v1/community/info/threadcategorylist';
  const res = await getLinxApi({
    url,
    headers: {},
    params: { game_id },
  });
  return res;
};

const createThread = async (
  {
    title = '',
    hubs_id,
    content = '',
    image_url = '',
    is_checkbox = 0,
    category_id,
    topic_id = '',
  },
  headers
) => {
  const url = '/v1/community/blog/createpost';
  const params = {
    topic_title: title,
    hubs_id,
    content,
    image_url,
    is_checkbox,
    category_id,
    topic_id,
  };
  const res = await postLinxApi({
    url,
    headers,
    params,
  });
  return res;
};

const getThreads = async ({ page = 1, game_id, category_id }) => {
  const url = '/v1/community/blog/postlist';
  const res = await getLinxApi({
    url,
    headers: {},
    params: {
      page,
      game_id,
      category_id,
    },
    cache: true,
    cacheTTL: 60 * 5,
  });
  return res;
};

const getTrendingToday = async (page, tag_id, headers) => {
  let url = '/v1/community/info/trendingtoday';
  if (!headers.authorization) {
    url = '/v1/community/info/publictrendingtoday';
  }
  const res = await getLinxApi({
    url,
    headers,
    params: {
      page,
      tagid: tag_id,
    },
    // cache: true,
    // cacheTTL: 60 * 5,
  });
  return res;
};
const getPopular = async (page = 1, headers) => {
  let url = '/v1/community/info/popularcontent';
  if (!headers.authorization) {
    url = '/v1/community/info/publicpopularcontent';
  }

  const res = await getLinxApi({
    url,
    headers,
    params: {
      page,
      category_id: '',
      game_id: '',
    },
    // cache: true,
    // cacheTTL: 60 * 5,
  });
  return res;
};
const getThreadById = async (id, headers) => {
  let url = '/v1/community/blog/getpost';
  if (!headers.authorization) {
    url = '/v1/community/blog/publicgetpost';
  }
  console.log('---------->>>>>');
  const res = await getLinxApi({
    url,
    headers,
    params: {
      post_id: id,
    },
    // cache: true,
    // cacheTTL: 60 * 5,
  });
  return res;
};

const getThreadReplies = async (id, page, headers) => {
  let url = '/v1/community/blog/getthreads';
  if (!headers.authorization) {
    url = '/v1/community/blog/publicgetthreads';
  }
  const res = await getLinxApi({
    url,
    headers,
    params: {
      post_id: id,
      page,
    },
  });
  return res;
};

const replyThread = async (
  { hubs_id, user_id, quote, post_id, thread_id, content },
  headers
) => {
  const url = '/v1/community/blog/replypost';

  const res = await postLinxApi({
    url,
    headers,
    params: {
      hubs_id,
      user_id,
      quote,
      post_id,
      thread_id,
      content,
    },
  });
  return res;
};

const likePost = async (post_id, headers) => {
  const url = '/v1/community/blog/likeapost';

  const res = await postLinxApi({
    url,
    headers,
    params: {
      post_id,
    },
  });
  return res;
};

const unlikePost = async (post_id, headers) => {
  const url = '/v1/community/blog/unlikeapost';

  const res = await postLinxApi({
    url,
    headers,
    params: {
      post_id,
    },
  });
  return res;
};
const likeThread = async (thread_id, headers) => {
  const url = '/v1/community/blog/likeathread';

  const res = await postLinxApi({
    url,
    headers,
    params: {
      thread_id,
    },
  });
  return res;
};

const unlikeThread = async (thread_id, headers) => {
  const url = '/v1/community/blog/unlikeathread';

  const res = await postLinxApi({
    url,
    headers,
    params: {
      thread_id,
    },
  });
  return res;
};

module.exports = {
  getTrendingToday,
  createThread,
  getPopular,
  getThreads,
  getCategories,
  getThreadById,
  getThreadReplies,
  replyThread,
  likeThread,
  unlikeThread,
  likePost,
  unlikePost,
};
