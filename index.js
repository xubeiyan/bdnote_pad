const Koa = require('koa')
const app = new Koa()

// 一些配置
const config = require('./config/config.json')

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(config.port)
console.log(`[demo] start-quick is starting at port ${config.port}`)