var Router = require('koa-router')
var r = require('rethinkdb')
var _ = require('lodash')

var tagCount = function *(next) {
  var ret = yield r.table('links').concatMap(function(v) { return v('tags') }).group(function(v) { return v}).count().run(c)
  ret = _(ret).map(function(v){ return [v.group, v.reduction]}).zipObject().value()
  this.body = ret
  yield next
}

var core = new Router()
module.exports = core

core
  .get('/tag-count', tagCount)
