var $ = function() { return document.querySelector.apply(document, arguments) }

window.onload = function() {
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0]
    $('#title').value = tab.title
    $('#url').value = tab.url
  })
}

$('#save').addEventListener('click', function(e){
  console.log('clicked', $('#title').value, $('#url').value)
})
