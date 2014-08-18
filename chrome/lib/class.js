// depends: lodash
//
// var User = Class.extend({
//   name: 2
//   init: function() { },
// })

function Class(options) {
  _.assign(this, options)
}

Class.prototype.constructor = Class

Class.extend = function(options) {
  var constructor = this
  function Klass() {
    constructor.apply(this, arguments)
    if (this.init) {
      this.init(options)
    }
  }

  Klass.prototype = Object.create(constructor.prototype)
  _.assign(Klass.prototype, options)
  Klass.prototype.constructor = Klass

  return Klass
}
