const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'http://data.maopingshou.com' : '',
  baseUrl: isProdMode ? 'http://maopingshou.com/' : 'http://localhost:3000/',
  socketHost: isProdMode ? 'http://maopingshou.com' : 'http://localhost:3000',
  imgUrl: isProdMode ? 'https://maoping2.oss-cn-shenzhen.aliyuncs.com' : 'https://maoping2.oss-cn-shenzhen.aliyuncs.com'
}
