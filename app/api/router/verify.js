const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
import linxResponse from '../util/linxResponse';

const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/verify.js');

router.post('/email', mockApi('post', 'verify-email'), async (req, res) => {
  if (!req.body && !req.body.token) {
    res.json(linxResponse);
  }
  const result = await controller.verifyEmail(req.body.token);

  res.json(result);
});
router.post(
  '/email/:email/resend',
  mockApi('post', 'verify-email-{email}-resend'),
  async (req, res) => {
    if (!req.params && !req.params.email) {
      res.json(linxResponse);
    }
    res.json(await controller.resendEmail(req.params.email));
  }
);

module.exports = router;
