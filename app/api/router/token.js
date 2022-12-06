const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/token.js');

router.get(
  '/pricetrend',
  mockApi('get', 'tokens-pricetrend'),
  async (req, res) => {
    res.json(await controller.getPriceTrend());
  }
);
router.get('/pricetrend/:ticker', async (req, res) => {
  res.json(await controller.getPriceTrend(req.params.ticker));
});

module.exports = router;
