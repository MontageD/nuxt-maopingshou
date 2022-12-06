import { postLinxApi } from '../util/linxApi';
const verifyEmail = async (token) => {
  const url = '/v1/account/user/emailverification';
  const res = await postLinxApi({
    url,
    headers: {},
    params: {
      token,
    },
  });
  return res;
};
const resendEmail = async (email) => {
  const url = '/v1/account/user/resendemailverification';
  const res = await postLinxApi({
    url,
    headers: {},
    params: {
      username: email,
    },
  });
  return res;
};

module.exports = { verifyEmail, resendEmail };
