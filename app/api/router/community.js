const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/community.js');

module.exports = router;
