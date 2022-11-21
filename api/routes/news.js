const express = require('express')
const router = express.Router()

const dbConfig = require('../../db/dbConfig')
const mysql = require('mysql')
const sd = require('silly-datetime')
const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
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

// 有关新闻信息的接口

// 获取关注数据接口 根据id 先后排序
router.get('/focus', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select *  ' +
      ' from w_news as a' +
      ' left join w_theme as b' +
      ' on b.c_type = a.theme' +
      ' where a.img <> \'\' and  a.id >= (select floor(RAND() * (SELECT MAX(id) FROM `w_news`)))' +
      ' group by a.id ' +
      ' limit ' + param.start
    connection.query(sql, (err, result) => {
      let sql = 'select *  ' +
        ' from w_news2 as a' +
        ' left join w_theme as b' +
        ' on b.c_type = a.theme' +
        ' where a.img <> \'\' and  a.id >= (select floor(RAND() * (SELECT MAX(id) FROM `w_news2`)))' +
        ' group by a.id ' +
        ' limit ' + param.start
      connection.query(sql, (err, res2) => {
        res2.forEach((currentValue, index, arr) => {
          let arrArr = currentValue.img.split('|')
          currentValue.imgArr = []
          arrArr.forEach((v, k) => {
            currentValue.imgArr.push({
              'img': v,
              'len': 1 / arrArr.length
            })
          })
          result.push(currentValue)
        })
        responseJSON(res, result)
      })
    })
    connection.release()
  })
})

// 获取热门数据接口   根据点赞数量决定
router.get('/hot', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select *  ' +
      ' from w_news as a' +
      ' left join w_theme as b' +
      ' on b.c_type = a.theme' +
      ' where a.img <> \'\' and  a.id >= (select floor(RAND() * (SELECT MAX(id) FROM `w_news`)))' +
      ' order by a.like  ' +
      ' limit ' + param.start
    connection.query(sql, (err, result) => {
      let sql = 'select *  ' +
        ' from w_news2 as a' +
        ' left join w_theme as b' +
        ' on b.c_type = a.theme' +
        ' where a.img <> \'\' and  a.id >= (select floor(RAND() * (SELECT MAX(id) FROM `w_news2`)))' +
        ' group by a.like ' +
        ' limit ' + param.start
      connection.query(sql, (err, res2) => {
        res2.forEach((currentValue, index, arr) => {
          let arrArr = currentValue.img.split('|')
          currentValue.imgArr = []
          arrArr.forEach((v, k) => {
            currentValue.imgArr.push({
              'img': v,
              'len': 1 / arrArr.length
            })
          })
          result.push(currentValue)
        })
        responseJSON(res, result)
      })
    })
    connection.release()
  })
})

// 修改文章点赞数'【
router.get('/zan', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'update w_news t set t.like= ' + param.like + ' where t.id =' + param.id
    connection.query(sql, (err, result) => {
      let sql = 'select * from w_news where id=' + param.id
      connection.query(sql, (err, res2) => {
        // res2 = JSON.parse(JSON.stringify(res2))
        responseJSON(res, res2)
      })
      connection.release()
    })
  })
})
router.get('/zan2', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'update w_news2 as t set t.like= ' + param.like + ' where t.id =' + param.id
    connection.query(sql, (err, result) => {
      let sql = 'select * from w_news2 where id=' + param.id
      connection.query(sql, (err, res2) => {
        // res2 = JSON.parse(JSON.stringify(res2))
        responseJSON(res, res2)
      })
      connection.release()
    })
  })
})
// 打开评论列表根据文章id
router.get('/comment', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_evaluation as a ' +
      ' left join w_user as b ' +
      ' on b.id = a.userid ' +
      ' where  a.comment_id =' + param.id
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

//  打开评论列表
router.get('/commentNews', (req, res, next) => {
  let param = req.query
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_news as a left join w_theme as b on b.c_type = a.theme where a.id=' + param.id
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

router.get('/commentNews2', (req, res, next) => {
  let param = req.query
  pool.getConnection((err, connection) => {
    let sql = 'select * from w_news2 as a left join w_theme as b on b.c_type = a.theme where a.id=' + param.id
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

router.get('/commentinsert', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let ti = time
    console.log(ti)
    let sql = 'insert into w_evaluation (userid,comment_text,comment_time,comment_zan,comment_id) '
      + ' values (' + param.userid + ',"' + param.content + '","' + ti + '","1","' + param.id + '")'
    connection.query(sql, (err, result) => {
      let sql = 'select * from w_evaluation as a\n' +
        'left join w_user as b ' +
        'on b.id = a.id ' +
        'where  a.comment_id =' + param.id
      connection.query(sql, (err, res2) => {
        responseJSON(res, res2)
      })
    })
    connection.release()
  })
})
module.exports = router
