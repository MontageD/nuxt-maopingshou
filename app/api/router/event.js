const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const {
  getEvent,
  getLatest,
  getEndingSoon,
  getCompleted,
} = require('../controller/event.js');

router.get('/', mockApi('get', 'events'), async (req, res) => {
  res.json(await getEvent());
});

router.get('/latest', mockApi('get', 'events-latest'), (req, res) => {
  res.json(getLatest());
});

router.get(
  '/completed',
  mockApi('get', 'events-completed'),
  async (req, res) => {
    res.json(await getCompleted());
  }
);

router.get(
  '/endingsoon',
  mockApi('get', 'events-endingsoon'),
  async (req, res) => {
    res.json(await getEndingSoon());
  }
);

module.exports = router;
