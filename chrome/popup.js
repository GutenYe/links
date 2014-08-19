var $ = function() { return document.querySelector.apply(document, arguments) }
var pd = function() { console.log.apply(console, arguments) }

// model
var Link = Class.extend({
  title: null,
  url: null,

  save: function() {
    _.ajax({
      type: 'POST',
      url: '/links',
      data: {
        title: this.title,
        url: this.url
      }
    })
  }
})

Link.find = function(id, callback) {
  _.ajax({
    type: 'GET',
    url: '/links/'+encodeURIComponent(id),
    success: function(data) {
      callback(data)
    }
  })
}

var LinkCtrl = Class.extend({
  model: null,

  draw: function() {
    pd('draw', this.model)
    $('#title').value = this.model.title
    $('#url').value = this.model.url
  },

  retrieve:function() {
    this.model.title = $('#title').value
    this.model.link = $('#url').value
    pd('retrieve', this.model)
  },

  save: function() {
    pd('save')
    this.retrieve()
    this.model.save()
  }
})

// main

var link, linkCtrl

window.onload = function() {
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0]
    pd('tab', tab)
    Link.find(tab.url, function(data) {
      pd('data', data)
      if (!data) {
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
