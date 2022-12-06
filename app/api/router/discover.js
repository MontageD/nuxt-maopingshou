const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
const controller = require('../controller/discover.js');

router.get('/getBanner', mockApi('get', 'banners'), async (req, res) => {
  return res.json(await controller.getBanner(req.query));
});
router.get('/getGames', mockApi('get', 'games-foryou'), async (req, res) => {
  return res.json(await controller.getGames());
});

router.get(
  '/getRecent',
  mockApi('get', 'games-newrelease'),
  async (req, res) => {
    return res.json(await controller.getRecent());
  }
);

router.get('/getNews', mockApi('get', 'news'), async (req, res) => {
  return res.json(await controller.getNews());
});

router.get(
  '/getUpcoming',
  mockApi('get', 'games-upcoming'),
  async (req, res) => {
    return res.json(await controller.getUpcoming());
  }
);

router.get(
  '/getRecentlyupdated',
  mockApi('get', 'games-recentlyupdated'),
  async (req, res) => {
    return res.json(await controller.getRecentlyupdated());
  }
);

module.exports = router;
