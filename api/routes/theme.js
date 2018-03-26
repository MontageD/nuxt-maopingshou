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

// 有关主题内容的数据
router.get('/themeList', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    console.log(param)
    let sql = 'select * from w_theme as a left join w_news as b on b.theme = a.c_type ' +
      ' where a.c_type= ' + param.id +
      ' order by a.uid desc limit ' + param.num
    connection.query(sql, (err, result) => {
      console.log(result)
      responseJSON(res, result)
    })
    connection.release()
  })
})

// 主页关注主题
router.get('/addTheme', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_user where id = ' + param.id
    connection.query(sql, (err, result) => {
      // result.data[0]
      // let mylike = this.$cookie.get('mylike')
      // let likeArray = mylike.split('|')
      // // 判断是否插入了cookie
      // let pan = 1
      // likeArray.forEach((value, index, array) => {
      //   if (parseInt(value) === parseInt(upId)) {
      //     // 存在于传过来的ID 相等的则不插入cookie
      //     pan = 0
      //   }
      // })
      // if (pan === 0) {
      //   // 存在就不插入 并取消 点赞logo
      //   mylike = mylike.replace('|' + upId, '')
      //   mylike = mylike.replace(upId, '')
      // } else {
      //   // 不存在就插入 并变换点赞logo
      //   mylike = mylike + '|' + upId
      // }
      // // 排除在第一的 "|"
      // mylike = mylike.substr(0, 1) === '|' ? mylike.substr(1, mylike.length - 1) : mylike
      //
      if (param.type === 1) {
        // 增加
        let theme = ''
        let sql = 'update w_user set theme = ' + theme + ' where id' + param.id
      } else {
        // 删除
        let theme = ''
        let sql = 'update w_user set theme = ' + theme + ' where id' + param.id
      }
      connection.query(sql, (err, res2) => {
        console.log(result)
        responseJSON(res, result)
      })
    })
    connection.release()
  })
})

router.get('/add', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_user where id =' + param.id
    connection.query(sql, (err, result) => {
      let theme = ''
      // 检测是否有这个主题
      let arr = result[0].theme.split('|')
      let p = 0
      arr.forEach((value, key) => {
        if (parseInt(value) === parseInt(param.theme)) {
          p = p + 1
        }
      })
      if (p === 0) {
        if (result[0].theme.length === 0) {
          theme = param.theme
        } else {
          console.log(result[0].theme)
          if (result[0].theme === '') {
            theme = result[0].theme + param.theme
          } else {
            theme = result[0].theme + '|' + param.theme
          }
        }
        let sql = 'update w_user as a set a.theme="' + theme + '" where a.id = ' + param.id
        console.log(sql)
        connection.query(sql, (err, res2) => {
          responseJSON(res, res2)
        })
      } else {
        responseJSON(res, result)
      }
    })
    connection.release()
  })
})

router.get('/remove', (req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'select * from w_user where id =' + param.id
    connection.query(sql, (err, result) => {
      let arr = result[0].theme.split('|')
      let newArr = ''
      arr.forEach((value, key) => {
        if (parseInt(value) === parseInt(param.theme)) {
        } else {
          newArr = newArr + value + '|'
        }
      })
      if (newArr.length !== 1) {
        newArr = newArr.substr(0, newArr.length - 1)
      }
      let sql = 'update w_user set theme="' + newArr + '" where id = ' + param.id
      connection.query(sql, (err, res2) => {
        responseJSON(res, res2)
      })
    })
    connection.release()
  })
})

module.exports = router
