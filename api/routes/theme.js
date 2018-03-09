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

router.get('/themeList', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    console.log(param)
    let sql = 'select * from w_theme as a left join w_news as b on b.theme = a.c_type ' +
      ' where a.c_type= ' + param.id +
      ' order by a.id desc limit ' + param.num
    connection.query(sql, (err, result) => {
      console.log(result)
      responseJSON(res, result)
    })
    connection.release()
  })
})

module.exports = router
