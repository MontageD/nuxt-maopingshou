### 猫评手网站 ([maopingshou.com](http://maopingshou.com))
* 聚合各种网站的评论信息并作筛选和分类,从你最喜欢的角度过滤信息
* 「人们想要的往往不是真相，而是他们想要看到的真相」


> Node.js(6.9.1) + vue(2.0) + vuex + (NUXT)SSR + nginx反向代理 


## PC

![](http://oj711uhrd.bkt.clouddn.com/WX20180129-105708@2x.png)

## Mobile

![](http://oj711uhrd.bkt.clouddn.com/8989.png)


## Todos 更新记录
- [x] 首页布局 
- [x] 评论页面布局 
- [ ] 主页点赞和评论功能 
- [ ] 抓取评论数据(豆瓣,新闻网站) 
- [ ] 评论搜索功能
- [ ] 评论搜索个人中心	
- [ ] 用户信息反馈并记录ip 地址
- [x] 用户登陆+注册
- [x] nuxt部署到nginx,pm2




## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# nuxt 部署到pm2 
$ pm2 start node_modules/nuxt/bin/nuxt-start -i max

```

如果我的项目对您有所帮助，您可以点右上角 "Star" 支持一下 感谢～～！
