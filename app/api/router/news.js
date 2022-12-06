const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
const controller = require('../controller/news.js');

router.get('/', mockApi('get', 'news'), (req, res) => {
  res.json(controller.getNewsList());
});
router.get('/ownedgames', mockApi('get', 'news-ownedgames'), (req, res) => {
  res.json(controller.getOwnedGamesNews());
});
router.get(
  '/trendingtoday',
  mockApi('get', 'news-trendingtoday'),
  async (req, res) => {
    res.json(await controller.getTrendingToday());
  }
);
router.get('/getAllGames', async (req, res) => {
  res.json(await controller.getAllGames(req.query));
});
router.get('/getNews', mockApi('get', 'news'), async (req, res) => {
  res.json(await controller.getNews(req.query));
});
router.get(
  '/getComments',
  mockApi('get', 'news-{id}-comments'),
  async (req, res) => {
    res.json(await controller.getComments(req.query));
  }
);
router.get(
  '/publicGetComments',
  mockApi('get', 'news-{id}-comments'),
  async (req, res) => {
    res.json(await controller.publicGetComments(req.query));
  }
);

router.post(
  '/createComments',
  mockApi('post', 'news-{id}-comments'),
  async (req, res) => {
    res.json(await controller.createComments(req.body, req.headers));
  }
);
router.post(
  '/likeComment',
  mockApi('post', 'news-{id}-like'),
  async (req, res) => {
    res.json(await controller.likeComment(req.body, req.headers));
  }
);
router.post(
  '/unlikeComment',
  mockApi('post', 'news-{id}-unlike'),
  async (req, res) => {
    res.json(await controller.unlikeComment(req.body, req.headers));
  }
);
router.post(
  '/editComment',
  mockApi('post', 'news-{news_id}-comments-edit'),
  async (req, res) => {
    res.json(await controller.editComment(req.body, req.headers));
  }
);
router.post('/likeanews', async (req, res) => {
  res.json(await controller.likeanews(req.body, req.headers));
});
router.post('/unlikeanews', async (req, res) => {
  res.json(await controller.unlikeanews(req.body, req.headers));
});

router.get('/trendingnews', async (req, res) => {
  res.json(await controller.trendingnews());
});
router.get('/getartilebanner', async (req, res) => {
  res.json(await controller.getartilebanner());
});
router.get('/featuredevent', async (req, res) => {
  res.json(await controller.featuredevent());
});
module.exports = router;
