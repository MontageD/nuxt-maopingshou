const express = require('express');
const { default: mockApi } = require('../middleware/mockApi');
const router = express.Router();
// const baseController = require('../controller/_base.js');
const controller = require('../controller/upload.js');

router.post('/image', mockApi('get', 'upload-image.post'), async (req, res) => {
  req.res.json(await controller.uploadImage(req.files.imagefile, req.headers));
});

module.exports = router;
