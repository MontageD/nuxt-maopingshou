const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/banner.js');

router.get('/', mockApi('get', 'banners'), async (req, res) => {
  res.json(await controller.getBanner());
});

module.exports = router;
