var Router = require("koa-router")
var r = require("rethinkdb")

var index = function *(next) {
  var cursor = yield r.table("links").run(c)
  var result = yield cursor.toArray()
  this.body = result
  yield next
}

var show = function *(next) {
  var model = findModel.call(this)
  var cursor = yield model.run(c)
  var ret = yield cursor.toArray()
  var link = ret[0]
  if (link) {
    this.body = link
  } else {
    this.status = 404
  }
  yield next
}

var create = function *(next) {
  var ret = yield r.table("links").insert(this.request.body).run(c)
  this.body = ""
  yield next
}

var update = function *(next) {
  var model = findModel.call(this)
  var ret = yield model.update(this.request.body).run(c)
  this.body = ""
  yield next
}

var destroy = function *(next) {
  var model = findModel.call(this)
  var ret = yield model.delete().run(c)
  this.body = ""
  yield next
}

var findModel = function() {
  var id = decodeURIComponent(this.params.id)
  return r.table("links").getAll(id, {index: "url"})
}

var links = new Router()
module.exports = links

links
  .get("/", index)
  .get("/:id", show)
  .post("/", create)
  .put("/:id", update)
  .delete("/:id", destroy)
