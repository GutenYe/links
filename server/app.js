var koa = require('koa')
var logger = require('koa-logger')
var mount = require('koa-mount')
var body = require('koa-body')
var rethinkdb = require('koa-rethinkdb')
var r = require('rethinkdb')
var linksCtrl = require('./controllers/links')
var coreCtrl = require('./controllers/core')

global.pd = function() { console.log.apply(console, arguments)}
var app = koa()

app
  .use(rethinkdb({db: 'links'}))
  .use(setC)
  .use(logger())
  .use(body())
  .use(mount('/api', coreCtrl.middleware()))
  .use(mount('/api/links', linksCtrl.middleware()))
  .use(test)
  .on('error', function(err) {
    console.error(err)
  })

function *test(next) {
  console.log("body: ", this.request.body)
  yield next
}

function *setC(next) {
  global.c = this.rethinkdb
  yield next
}

app.listen(9001)
