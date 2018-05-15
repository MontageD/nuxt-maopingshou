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

// 处理基本数据
router.get('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  var obj = {
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
    let sql = '(select ' +
      'a.id,a.title,a.time,a.content,a.score,a.author,a.img,a.order_id,a.types,a.like,a.theme,a.href,a.showType,a.type,b.uid,b.c_title,' +
      'b.c_img,b.c_mark,b.c_focus_num,b.c_type,b.c_show' +
      ' from w_news as a left join w_theme as b on b.c_type = a.theme  where a.img <>  \'\'' +
      ' and a.id >= (select floor(RAND() * (SELECT MAX(id) FROM `w_news`)))' +
      '  order by a.id desc' +
      ' limit ' + param.start + ')' +
      'UNION ALL' +
      '(select ' +
      ' a.id,a.title,a.time,a.content,a.score,a.author,a.img,a.order_id,a.types,a.like,a.theme,a.href,a.showType,a.type,b.uid,b.c_title,' +
      'b.c_img,b.c_mark,b.c_focus_num,b.c_type,b.c_show' +
      ' from w_news2 as a left join w_theme as b on b.c_type = a.theme ' +
      ' where a.img <> \'\' and  a.id >= (select floor(RAND() * (SELECT MAX(id) FROM `w_news2`)))' +
      ' group by a.id,a.like ' +
      ' limit ' + (parseInt(param.start) + parseInt(param.start)) + ')' +
      ' order by RAND(),time '
    // 随机插入，按照time变换
    connection.query(sql, (err, result) => {
      result = JSON.parse(JSON.stringify(result))
      let rest = []
      result.forEach((currentValue, index, arr) => {
        let arrArr = currentValue.img.split('|')
        currentValue.imgArr = []
        arrArr.forEach((v, k) => {
          currentValue.imgArr.push({
            'img': v,
            'len': 1 / arrArr.length
          })
        })
        rest.push(currentValue)
      })
      responseJSON(res, rest)
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
    let sql = 'select id,title,time,content,score,type,author,img,order_id,types from w_news where id =' + param
    connection.query(sql, (err, result) => {
      console.log(result)
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
// 跳转主题详细的接口
router.get('/theme', (req, res, next) => {
  let param = req.query.uid
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_theme where uid =' + param
    connection.query(sql, (err, result) => {
      result = JSON.parse(JSON.stringify(result))
      let sql = ''
      if (result[0].c_news === 1) {
        sql = 'select * from w_news where theme=\'' + result[0].c_type + '\' limit 10'
      } else {
        sql = 'select * from w_news2 where theme=\'' + result[0].c_type + '\' limit 10'
      }
      connection.query(sql, (err, res2) => {
        result[0].aList = res2
        responseJSON(res, result)
      })
    })
    connection.release()
  })
})
// 跳转主题详细的接口
router.get('/theme2', (req, res, next) => {
  let param = req.query.uid
  let limit = req.query.limit
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_theme where uid =' + param
    connection.query(sql, (err, result) => {
      result = JSON.parse(JSON.stringify(result))
      let sql = ''
      if (result[0].c_news === 1) {
        sql = 'select * from w_news where theme=\'' + result[0].c_type + '\' limit ' + limit
      } else {
        sql = 'select * from w_news2 where theme=\'' + result[0].c_type + '\' limit ' + limit
      }
      connection.query(sql, (err, res2) => {
        result[0].aList = res2
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
      // ' GROUP BY b.title' +
      // ' order by b.id ' +
      ' order by rand() ' +
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
    let sql = 'select * from w_news  group by types order by id desc limit  ' + param.num
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
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 提交用户名和密码,邮箱， 注册用户信息
router.get('/userPost', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'INSERT INTO w_user (username,password,email) VALUES ("' + param.username + '","' + param.password + '","' + param.email + '")'
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
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})
// 加载主页主题
router.get('/getTheme', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_theme  limit  ' + param.num
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
  if (param.username === 'demo' && param.password === 'demo') {
    req.session.authUser = {username: 'demo'}
    return res.json({username: 'demo'})
  }
  res.status(401).json({message: 'Bad credentials'})

})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  delete req.session.authUser
  res.json({ok: true})
})

// 检验登陆状态
router.get('/loginState', (req, res) => {
  let param = req.query
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_user where username= "' + param.username + '" and password="' + param.password + '"'
    connection.query(sql, (err, result) => {
      result = JSON.parse(JSON.stringify(result))
      if (result.length === 0) {
        responseJSON(res, '1')
      } else {
        let idArr = result[0].theme.split('|')
        let sqltext = ''
        for (let i = 0; i < idArr.length; i++) {
          if (i === 0) {
            sqltext = sqltext + ' uid =' + idArr[i]
          } else {
            sqltext = sqltext + ' or uid=' + idArr[i]
          }
        }
        let sql = 'select * from w_theme where ' + sqltext

        connection.query(sql, (err, res2) => {
          result[0].aList = []
          res2 = JSON.parse(JSON.stringify(res2))
          res2.forEach((currentValue, index, arr) => {
            result[0].aList[index] = {}
            result[0].aList[index] = currentValue
          })
          responseJSON(res, result)
        })
      }
    })
    connection.release()
  })
})

// 根据用户名获取用户信息
router.get('/getUserData', (req, res) => {
  let param = req.query
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_user where username= "' + param.username + '"'
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})
// 根据用户id 获取用户信息
router.get('/getIdData', (req, res) => {
  let param = req.query
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_user where id=' + param.id
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})
router.get('/getAlist', (req, res) => {
  let param = req.query
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_user where username= "' + param.username + '"'
    connection.query(sql, (err, result) => {

      let idArr = result[0].theme.split('|')
      let sqltext = ''
      for (let i = 0; i < idArr.length; i++) {
        if (i === 0) {
          sqltext = sqltext + ' uid =' + idArr[i]
        } else {
          sqltext = sqltext + ' or uid=' + idArr[i]
        }
      }

      result = JSON.parse(JSON.stringify(result))

      let sql = 'select * from w_theme where ' + sqltext
      connection.query(sql, (err, res2) => {
        result[0].aList = []
        res2 = JSON.parse(JSON.stringify(res2))
        res2.forEach((currentValue, index, arr) => {
          result[0].aList[index] = Object.assign({}, currentValue)
        })
        responseJSON(res, result)
      })
    })
    connection.release()
  })
})

router.get('/good', (req, res) => {
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_user'
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

module.exports = router
