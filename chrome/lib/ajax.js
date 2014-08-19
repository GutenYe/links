_.ajax = function(options) {
  _.defaults(options, {
    type: 'GET',
    url: '/',
    data: {},
    success: function() {}
  })

  var xhr = new XMLHttpRequest()
  xhr.open(options.type, 'http://localhost:9001'+options.url, true)
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        options.success(JSON.parse(this.responseText))
      }
    }
  }
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(options.data))
}
