const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : '',
  baseUrl: isProdMode ? 'https://maopingshou.com/' : 'http://localhost:3000/',
  socketHost: isProdMode ? 'https://surmon.me' : 'http://localhost:3000'
}
