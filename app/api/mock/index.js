const { readdirSync, readFileSync } = require('fs');
const getAllMock = function () {
  const files = readdirSync('./api/mock');
  return files.filter((file) => {
    return !file.includes('.js');
  });
};
const getSingleMockRequest = function (key) {
  const file = readFileSync(`./api/mock/${key}/request.json`, 'utf8');
  return JSON.parse(file);
};
const getSingleMockResponse = function (key) {
  const file = readFileSync(`./api/mock/${key}/response.json`, 'utf8');
  return JSON.parse(file);
};
export { getAllMock, getSingleMockRequest, getSingleMockResponse };
