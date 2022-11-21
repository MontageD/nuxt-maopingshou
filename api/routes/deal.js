const express = require('express')
const router = express.Router()

const dbConfig = require('../../db/dbConfig')
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

// 处理表单或者特殊数据处理
router.get('/updateUser', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'update w_user set   nickname = "' + param.nickname + '" , password = "' + param.password + '" where id =' + param.id
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})
router.get('/updateTheme', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  pool.getConnection((err, connection) => {
    let param = req.query
    let sql = 'update w_user set theme = "' + param.theme + '" where id =' + param.id
    console.log(sql)
    connection.query(sql, (err, result) => {
      responseJSON(res, result)
    })
    connection.release()
  })
})

module.exports = router
