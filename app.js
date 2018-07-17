const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const db = require('./utils/db');
const utils =  require('./utils/utils');

global.db = db;

const admin = require('./routes/admin')
const users = require('./routes/users')
const common = require('./routes/common')

app.keys = ['management'];
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


//error handle
app.use(utils.errHandle);

app.use(utils.session());
//login
// app.use(utils.isLogin);

app.use(require('koa-static')(__dirname + '/public'))

// routes
app.use(admin.routes(), admin.allowedMethods());
app.use(common.routes(), common.allowedMethods());

// error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

module.exports = app
