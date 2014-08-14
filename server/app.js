var koa = require('koa')
var logger = require('koa-logger')
var Router = require('koa-router')
var mount = require('koa-mount')
var rethinkdb = require('koa-rethinkdb')
var r = require('rethinkdb')
var pd = function() { console.log.apply(console, arguments)}
var c = null

var app = koa()
var api = new Router()

api
  .get('/links', get)

app
  .use(rethinkdb({db: 'links'}))
  .use(setC)
  .use(logger())
  .use(mount('/api', api.middleware()))
  .use(test)

function *test(next) {
  var a = yield r.table('users').count().run(c)
  this.body = a
}

function *setC(next) {
  c = this.rethinkdb
  yield next
}

function *get(next) {
  var cursor = yield r.table('links').run(c)
  var result = yield cursor.toArray()
  this.body = result
}

app.listen(9001)
