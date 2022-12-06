const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/hub.js');

router.get('/', mockApi('get', 'hubs'), async (req, res) => {
  res.json(await controller.getAll(req.query.page, req.query.tags_id));
});
router.get('/recent', mockApi('get', 'hubs-recent'), async (req, res) => {
  res.json(await controller.getRecent());
});
router.get('/filters', mockApi('get', 'hubs-filters'), async (req, res) => {
  res.json(await controller.getFilters(req.query.display_section));
});
router.get('/feature', mockApi('get', 'hubs-feature'), async (req, res) => {
  res.json(await controller.getFeature());
});

module.exports = router;
