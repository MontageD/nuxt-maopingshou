const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'http://data.maopingshou.com' : '',
  baseUrl: isProdMode ? 'http://maopingshou.com/' : 'http://localhost:3000/',
  socketHost: isProdMode ? 'http://maopingshou.com' : 'http://localhost:3000',
  imgUrl: isProdMode ? 'https://maoping2.oss-cn-shenzhen.aliyuncs.com/' : 'https://maoping2.oss-cn-shenzhen.aliyuncs.com/',
  seokeywords: isProdMode ? '猫评网利用大量数据精确筛选用户需要的内容，内容包括要闻、 社区生活、传统文化、法律财经、教育移民、医疗健康、艺术时尚、旅游地产、美食、娱乐体育。' : '猫评网利用大量数据精确筛选用户需要的内容，内容包括要闻、 社区生活、传统文化、法律财经、教育移民、医疗健康、艺术时尚、旅游地产、美食、娱乐体育。'
}
