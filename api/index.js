const {Nuxt, Builder} = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const server = require('http').Server(app)
var index = require('./routes/index')
// Body parser，用来封装 req.body

// Sessions 来创建 req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}))

// app.get('/good', (req, res) => {
//   res.send('good')
// })
// app.get('/api/login', (req, res) => {
//   let param = req.query
//   console.log(param)
//   if (param.username === 'demo' && param.password === 'demo') {
//     req.session.authUser = {username: 'demo'}
//     return res.json({username: 'demo'})
//   }
//   res.status(401).json({message: 'Bad credentials'})
// })
//
// // 发起 POST /api/logout 请求注销当前用户，并从 req.session 中移除
// app.post('/api/logout', function (req, res) {
//   delete req.session.authUser
//   res.json({ok: true})
// })

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

server.listen(port, host)

const config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')
app.use(bodyParser.json())
const nuxt = new Nuxt(config)
app.use(nuxt.render)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch((error) => {
    // eslint-disable-line no-console
    console.error(error)
    process.exit(1)
  })
}

app.listen(3000)
console.log('Server is listening on http://localhost:3000')
