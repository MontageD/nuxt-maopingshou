const express = require('express')
const router = express.Router()

const dbConfig = require('../db/dbConfig')
const mysql = require('mysql')
const pool = mysql.createPool(dbConfig.mysql)

let responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200', msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', {title: 'Express'})
// })
router.get('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  let obj = {
    name: 'huangming',
    age: 16
  }
  res.json(obj)
})

router.get('/list', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    // let sql = "select id,title,time,content,score,type,author,img,order_id,types from w_news where img <> ''  order by id  desc limit " + param.start + " ";
    let sql = 'select id,title,time,content,score,type,author,img,order_id,types from w_news where img <> \'\'  order by id  desc limit ' + param.start + ' '
    connection.query(sql, (err, result) => {
      // if (result) {
      //   result = {
      //     code: 200,
      //     msg: '增加成功'
      //   };
      // }
      responseJSON(res, result)
    })
    connection.release()

  })
})

// 获取猜你喜欢的新闻
router.get('/likeInfo', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    // let sql = "select id,title,time,content,score,type,author,img,order_id,types from w_news where img <> ''  order by id  desc limit " + param.start + " ";
    let sql = 'select id,title,time,content,score,type,author,img,order_id,types from w_news where img <> \'\' group by title   order by id  asc limit ' + param.start + ' '
    connection.query(sql, (err, result) => {
      // if (result) {
      //   result = {
      //     code: 200,
      //     msg: '增加成功'
      //   };
      // }
      responseJSON(res, result)
    })
    connection.release()

  })
})

//  跳转评论详细的接口
router.get('/recommend', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  let param = req.query.uid  // 参数
  pool.getConnection((err, connection) => {
    let sql = 'select id,title,time,content,score,type,author,img,order_id,types,like from w_news where id =' + param
    connection.query(sql, (err, result) => {
      let sql = 'select * from w_comment where order_id=\'' + result[0].title + '\''
      result = JSON.parse(JSON.stringify(result))
      connection.query(sql, (err, res2) => {
        result[0].aList = []
        res2 = JSON.parse(JSON.stringify(res2))
        res2.forEach((currentValue, index, arr) => {
          result[0].aList[index] = {}
          result[0].aList[index] = currentValue
        })
        responseJSON(res, result)
      })
    })
    connection.release()
  })
})

// 主页右侧接口
router.get('/mainSide', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  // 推荐5条精彩评论
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select a.content,b.img,b.title,b.id from w_comment as a' +
      ' LEFT JOIN w_news as b' +
      ' on a.order_id = b.title' +
      ' where img <> \'\'' +
      ' GROUP BY b.title' +
      ' order by b.id ' +
      ' limit  ' + param.start + ' '
    connection.query(sql, (err, result) => {
      // if (result) {
      //   result = {
      //     code: 200,
      //     msg: '增加成功'
      //   };
      // }
      responseJSON(res, result)
    })
    connection.release()

  })
})

// 常用标签
router.get('/oftenTag', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select type,id from w_news  group by type order by id desc limit  ' + param.num
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })

})

// 导航条数据
router.get('/menuList', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_menu '
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 根据新闻类型获取新闻评论 限制数量
router.get('/news', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_comment where comment_type= \'' + param.type + '\' limit ' + param.num
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 根据标题查询新闻
router.get('/getNews', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_news where title like  \'%' + param.title + '%\' limit ' + param.num
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 根据评论查询评论内容
router.get('/getComment', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_comment where content like \'%' + param.title + '%\' limit ' + param.num
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 文章点赞
router.get('/zanLike', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'update w_news set like =' + param.like + ' where id =' + param.id
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 提交用户名和密码,邮箱， 注册用户信息
router.get('/userPost', (req, res, next) => {
  console.log('链接数据')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'INSERT INTO w_user (username,password,email) VALUES ("' + param.username + '","' + param.password + '","' + param.email + '")'
    console.log('开启sql')
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 检验登陆状态
router.get('/loginState', (req, res, next) => {
  console.log('链接数据')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_user where username= "' + param.username + '" and password="' + param.password + '"'
    console.log('开启sql')
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 向数据库中插入意见反馈数据
router.get('/postAdvice', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'INSERT INTO w_advice (username,advice,email,ip) VALUES ("' + param.username + '","' + param.advice + '","' + param.email + '","' + ip + '")'
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 登陆接口
router.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  let param = req.query
  console.log(param)
  if (param.username === 'demo' && param.password === 'demo') {
    req.session.authUser = {username: 'demo'}
    return res.json({username: 'demo'})
  }
  res.status(401).json({message: 'Bad credentials'})
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {

  delete req.session.authUser
  res.json({ok: true})
})
router.get('/good', (req, res) => {
  res.send('hello')

  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'INSERT INTO w_advice (username,advice,email,ip) VALUES ("' + param.username + '","' + param.advice + '","' + param.email + '","' + ip + '")'
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

module.exports = router
