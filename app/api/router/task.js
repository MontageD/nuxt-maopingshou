const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/task.js');

router.get('status', mockApi('get', 'tasks-status'), (req, res) => {
  res.json(controller.getStatus());
});

module.exports = router;
