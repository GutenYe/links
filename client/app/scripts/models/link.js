'use strict';

angular.module('App').factory('Link', function($resource) {
  return $resource('/api/links/:linkId')
})
