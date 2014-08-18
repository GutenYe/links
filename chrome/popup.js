//var $ = function() { return document.querySelector.apply(document, arguments) }
var pd = function() { console.log.apply(console, arguments) }

// model
var Link = Class.extend({
  title: null,
  url: null,

  save: function() {
    ajax({
      type: 'POST',
      url: '/links',
      data: {
        title: this.title,
        url: this.url
      }
    })
  }
})

var LinkCtrl = Class.extend({
  model: null,

  send: function() {
    $('#title').value = this.model.title
    $('#url').value = this.model.url
  },

  recive: function() {
    this.model.title = $('#title').value
    this.model.link = $('#url').value
  }
})

// main

window.onload = function() {
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0]
    Link.get(tab.url, function(data) {
      if (!data) {
        data.title = tab.title
        data.url = tab.url
      }

      var link = new Link(data)
      var linkCtrl = new LinkCtrl({model: link})
      linkCtrl.send()
    })
  })
}

$('#save').addEventListener('click', function(e){
  linkctrl.recive()
  link.save()
})
