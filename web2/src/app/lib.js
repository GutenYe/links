'use strict';

_.isBlank = function(value) {
  return _.isNull(value) || _.isUndefined(value) || (_.isString(value) && value.trim() === '')
}
