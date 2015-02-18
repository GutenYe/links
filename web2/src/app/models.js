'use strict';

angular.module('app')
.factory('Link', function($resource) {
  return $resource('/api/links/:id', {id: '@id'})
})
