import { postLinxApi } from '../util/linxApi';
const fs = require('fs');
const path = require('path');

const FormData = require('form-data');

const uploadImage = async (file, headers) => {
  const form = new FormData();
  const now = new Date().getTime();
  const tempFileName = `temp/${now}_${file.name}`;
  if (!fs.existsSync('temp')) {
    fs.mkdirSync('temp');
  }
  await file.mv(tempFileName);
  const toUpload = fs.createReadStream(tempFileName);
  // File parsed by multer from incoming request
  form.append('imagefile', toUpload);
  const url = '/v1/community/blog/uploadimage';
  const res = await postLinxApi({
    url,
    headers,
    params: form,
  });
  fs.rmSync(tempFileName);
  return res;
};

module.exports = {
  uploadImage,
};
