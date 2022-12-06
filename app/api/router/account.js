const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/account.js');
import axios from 'axios';
router.post('/login', mockApi('post', 'account-login'), async (req, res) => {
  res.json(await controller.login(req.body.username, req.body.password));
});
router.post('/logout', mockApi('post', 'account-logout'), async (req, res) => {
  res.json(
    await controller.logout({
      ...req.body,
    })
  );
});
router.post('/signup', mockApi('post', 'account-login'), async (req, res) => {
  res.json(
    await controller.signup({
      ...req.body,
    })
  );
});
router.post(
  '/forgotpassword',
  mockApi('post', 'account-forgotpassword'),
  (req, res) => {
    res.json(controller.forgotpassword());
  }
);
router.post(
  '/loginAuth',
  mockApi('post', 'account-login'),
  async (req, res) => {
    return res.json(await controller.loginAuth(req.body));
  }
);

module.exports = router;
