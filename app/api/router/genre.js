const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/genre.js');

router.get('/popular', mockApi('get', 'genres-popular'), async (req, res) => {
  res.json(await controller.getPopular());
});
module.exports = router;
