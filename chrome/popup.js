var $ = function() { return document.querySelector.apply(document, arguments) }
var pd = function() { console.log.apply(console, arguments) }

// model
var Link = Class.extend({
  title: null,
  url: null,

  save: function() {
    var data =  {
      title: this.title,
      url: this.url
    }

    var type = 'POST',
        url = '/links'
    if (this.id) {
      type = 'PUT'
      url = '/links/' + encodeURIComponent(this.url)
    }

    _.ajax({
      type: type,
      url: url,
      data: data
    })
  }
})

Link.find = function(id, callback) {
  _.ajax({
    type: 'GET',
    url: '/links/'+encodeURIComponent(id),
    success: function(data) {
      callback(data)
    },
    notFound: function() {
      callback({}, true)
    }
  })
}

var LinkCtrl = Class.extend({
  model: null,

  draw: function() {
    $('#title').value = this.model.title
    $('#url').value = this.model.url
  },

  retrieve:function() {
    this.model.title = $('#title').value
    this.model.link = $('#url').value
  },

  save: function() {
    this.retrieve()
    this.model.save()
  }
})

// main

var link, linkCtrl

window.onload = function() {
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0]
    Link.find(tab.url, function(data, notFound) {
      if (notFound) {
        data.title = tab.title
        data.url = tab.url
      }

      link = new Link(data)
      linkCtrl = new LinkCtrl({model: link})
      linkCtrl.draw()
    })
  })
}

$('#save').addEventListener('click', function(e){
  linkCtrl.save()
})
