// eslint-disable-next-line no-unused-vars
export default (method, jsonLocation, force = false) => {
  return (req, res, next) => {
    if ((process.env.MOCK && process.env.MOCK == 1) || force) {
      res.sendFile(`/mock/${jsonLocation}.${method}/response.json`, {
        root: './api',
      });
    } else {
      next();
    }
  };
};
