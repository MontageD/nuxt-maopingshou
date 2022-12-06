const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/game.js');
const reviewController = require('../controller/review.js');

router.get('/foryou', mockApi('get', 'games-foryou'), function () {
  return controller.getForYou();
});
router.get(
  '/recentlyupdated',
  mockApi('get', 'games-recentlyupdated'),
  function () {
    return controller.getRecentlyUpdated();
  }
);
router.get(
  '/newrelease',
  mockApi('get', 'games-newrelease'),
  async (req, res) => {
    res.json(await controller.getNewRelease());
  }
);
router.get('/upcoming', mockApi('get', 'games-upcoming'), function () {
  return controller.getUpcoming();
});
router.get('/all', mockApi('get', 'games-all'), async (req, res) => {
  res.json(await controller.getAll(req.query));
});

router.get('/filters', mockApi('get', 'games-filters'), async (req, res) => {
  res.json(await controller.getFilter());
});

router.get(
  '/getRecentlyPlayed',
  mockApi('get', 'games-recentlyplayed'),
  async (req, res) => {
    return res.json(await controller.getRecentlyPlayed(req.query, req.headers));
  }
);

// game - paly

router.get('/getOwned', mockApi('get', 'games-owned'), async (req, res) => {
  return res.json(await controller.getOwned(req.query, req.headers));
});
router.get(
  '/getPlaynext',
  mockApi('get', 'games-playnext'),
  async (req, res) => {
    return res.json(await controller.getPlaynext(req.query, req.headers));
  }
);
router.get(
  '/getUserlastestnews',
  mockApi('get', 'games-newrelease'),
  async (req, res) => {
    return res.json(
      await controller.getUserlastestnews(req.query, req.headers)
    );
  }
);
router.post('/:id/reviews', mockApi('post', 'reviews'), async (req, res) => {
  res.json(
    await reviewController.postReviews(req.params.id, req.body, req.headers)
  );
});

router.get('/:id', mockApi('get', 'games-{id}'), async (req, res) => {
  res.json(await controller.getGameInfo(req.params.id));
});

module.exports = router;
