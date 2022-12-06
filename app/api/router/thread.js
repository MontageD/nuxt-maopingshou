const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
const controller = require('../controller/thread.js');
const linxResponse = require('../util/linxResponse');

router.get('/', mockApi('get', 'threads'), async (req, res) => {
  res.json(
    await controller.getThreads({
      page: req.query.page,
      category_id: req.query.category_id,
      game_id: req.query.game_id,
    })
  );
});
router.post('/', mockApi('post', 'threads'), async (req, res) => {
  res.json(await controller.createThread(req.body, req.headers));
});
router.get('/popular', mockApi('get', 'threads-popular'), async (req, res) => {
  res.json(await controller.getPopular(1, req.headers));
});
router.get(
  '/categories',
  mockApi('get', 'threads-trendingtoday'),
  async (req, res) => {
    res.json(
      await controller.getCategories(req.query ? req.query.game_id : '')
    );
  }
);

router.get(
  '/trendingtoday',
  mockApi('get', 'threads-trendingtoday'),
  async (req, res) => {
    res.json(await controller.getTrendingToday(1, '', req.headers));
  }
);

router.post('/like', async (req, res) => {
  const type = req.body.type;
  if (type == 'post') {
    res.json(await controller.likePost(req.body.id, req.headers));
  } else {
    res.json(await controller.likeThread(req.body.id, req.headers));
  }
});
router.post('/unlike', async (req, res) => {
  const type = req.body.type;

  if (type == 'post') {
    res.json(await controller.unlikePost(req.body.id, req.headers));
  } else {
    res.json(await controller.unlikeThread(req.body.id, req.headers));
  }
});
router.get('/:id', mockApi('get', 'threads-{id}'), async (req, res) => {
  res.json(await controller.getThreadById(req.params.id, req.headers));
});

router.get(
  '/:id/reply',
  mockApi('get', 'threads-{id}-reply'),
  async (req, res) => {
    res.json(
      await controller.getThreadReplies(
        req.params.id,
        req.query.page,
        req.headers
      )
    );
  }
);
router.post(
  '/:id/reply',
  mockApi('post', 'threads-{id}-reply'),
  async (req, res) => {
    if (req.params.id != req.body.post_id) {
      res.json(linxResponse);
    }
    res.json(await controller.replyThread(req.body, req.headers));
  }
);

module.exports = router;
