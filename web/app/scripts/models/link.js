'use strict';

angular.module('App').factory('Link', ['resource', function($resource) {
  return $resource('/api/links/:id', {id: '@id'})
}])
