_.ajax = function(options) {
  _.defaults(options, {
    type: "GET",
    url: "/",
    data: {},
    success: function() {},
    notFound: function() {}
  })

  var xhr = new XMLHttpRequest()
  xhr.open(options.type, "http://localhost:9001/api"+options.url, true)
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        options.success(JSON.parse(this.responseText))
      } else if (this.status === 404) {
        options.notFound(null)
      }
    }
  }
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(options.data))
}
