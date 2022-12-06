const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
const controller = require('../controller/review.js');

router.get('/', mockApi('get', 'reviews'), async (req, res) => {
  res.json(
    await controller.getReviews(
      req.query.game_id,
      req.query.page,
      req.query.sort,
      req.headers
    )
  );
});
router.post(
  '/:id/vote',
  mockApi('post', 'reviews-{id}-vote'),
  async (req, res) => {
    res.json(
      await controller.vote(req.params.id, req.body.vote_direction, req.headers)
    );
  }
);

module.exports = router;
