<!--
 * @Author: your name
 * @Date: 2018-06-02 23:27:00
 * @LastEditTime : 2020-01-26 19:44:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-maopingshou/README.md
 -->
### 猫评手网站 :octocat:  ([maopingshou.com](http://maopingshou.com))
* 聚合各种网站的评论信息并作筛选和分类,从你最喜欢的角度过滤信息
* 「人们想要的往往不是真相，而是他们想要看到的真相」


> Node.js(6.9.1) + vue(2.0) + vuex + (NUXT)SSR + nginx反向代理   🚀🚀💥  


## PC 	💻 

![](http://oj711uhrd.bkt.clouddn.com/666-2018.png)

## Mobile 📱

![](http://oj711uhrd.bkt.clouddn.com/rpg.png)

## Todos 更新记录 🌒  🌔  	🌜  🌍 
- [x] 首页布局 
- [x] 评论页面布局 
- [x] 主页点赞和评论功能 
- [x] 主题模块功能
- [x] 评论搜索功能
- [x] 布局改版
- [x] 用户登陆+注册
- [x] nuxt部署到nginx,pm2
- [x] 登陆注册功能   
- [x] 主页新闻下拉刷新跟上拉刷新新闻内容
- [x] 两种不同类型新闻的样式显示  -本地存储的新闻 -多图片的外链新闻
- [x] 对应主题新闻数据展示
- [x] 用户信息反馈并记录ip 地址
- [x] 优化主页加载速度
- [x] 抓取新闻数据
- [ ] 主页新闻和详细页的分享信息
- [ ] 正常用户可以发表言论消息-新闻
- [ ] 优化随机查询算法
- [ ] 多主题的信息归类
- [ ] 多新闻主题的爬虫 - python改为node爬虫 ,每日定时抓取
- [ ] 项目总结
- [ ] 针对nuxt 的SEO处理
- [ ] 图片加载优化,并对接啊里云上传图片
- [ ] 倒退的时钟 ⏲️




## Build Setup

``` bash

# install dependencies
$ npm install 

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# nuxt 部署到pm2 
$ pm2 start node_modules/nuxt/bin/nuxt-start -i max





# 数据库已经共享，有需要可以下载调试(设计较为简单，仅供参考)
# 配置 后台数据库
创建 api/db/dbConfig.js
module.exports =
    {
      mysql: {
        host: '88.88.88.88',   // 数据库ip 地址
        user: 'root',             // 数据库用户名
        password: '*****', // 数据库密码
        database: '*****', // 数据库表
        port: 3306           // 数据库端口号
      }
    }

# 网站采用https协议,部署配置放在 nginx.conf.md
# 环境为centos6.8 nginx 反向代理
  
```








如果我的项目对您有所帮助，您可以点右上角 "Star" 支持一下 感谢～～！
