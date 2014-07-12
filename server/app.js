var koa = require('koa')
var r = require('rethinkdb')
var app = koa()

app.use(function *(){
  this.body = 'Hello World'
})

app.listen(3100)
