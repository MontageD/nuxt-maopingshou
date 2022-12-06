const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/search.js');

router.get('/', mockApi('get', 'search'), (req, res) => {
  res.json(controller.search(req.params.keyword));
});

module.exports = router;
