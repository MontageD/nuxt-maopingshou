const { default: linxApi } = require('../util/linxApi');
import { postLinxApi } from '../util/linxApi';
import axios from 'axios';

const login = async (username, password) => {
  const url = '/v1/account/user/login';
  const base64 = Buffer.from(username + ':' + password).toString('base64');
  const basicAuth = `Basic ${base64}`;
  const res = await postLinxApi({
    url,
    headers: {
      Authorization: basicAuth,
    },
    cache: false,
    params: null,
  });
  return res;
};

const logout = async (params) => {
  const url = '/v1/account/user/logout';
  const res = await postLinxApi({
    url,
    headers: {},
    params,
    cache: false,
  });
  return res;
};

const signup = async (params) => {
  const url = '/v1/account/user/signup';
  const res = await postLinxApi({
    url,
    headers: {},
    params,
  });
  return res;
};

const forgotpassword = () => {
  return {
    status: 1,
    data: [],
    message: '',
  };
};

const loginAuth = async (params) => {
  console.log('params', params);
  const url = '/v1/account/user/loginoauth';
  const res = await postLinxApi({
    url,
    headers: {},
    params,
  });
  console.log('res', res);
  return res;
};

const getAuth = async (params) => {
  console.log('params', params);
  const GOOGLE_URL = `https://www.googleapis.com/oauth2/v2/userinfo`;
  // const GOOGLE_URL = `http://www.baidu.com`;
  const apiRes = await axios.get(GOOGLE_URL, {
    params: {
      access_token: params.access_token,
    },
  });
  console.log('apiRes', apiRes);
  return apiRes;
};

module.exports = { login, logout, signup, forgotpassword, loginAuth, getAuth };
