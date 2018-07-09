const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const db = require('./utils/db');
const utils =  require('./utils/utils');
const session = require("koa-session2");

global.db = db;

const admin = require('./routes/admin')
const users = require('./routes/users')
const common = require('./routes/common')


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

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

app.use(session());
//login
// app.use(utils.isLogin);

// routes
app.use(admin.routes(), admin.allowedMethods());
app.use(common.routes(), common.allowedMethods());

// error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

module.exports = app
