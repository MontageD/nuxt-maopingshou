const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/page.js');

router.get('/', mockApi('get', 'pages'), async (req, res) => {
  res.json(await controller.getStaticPage(req.query.page));
});
1;
module.exports = router;
