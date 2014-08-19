'use strict';

angular.module('App').controller('IndexCtrl', function($scope, Link) {
  $scope.links = Link.query()

  $scope.filterTag = function(query) {
    return function(link) {
      if (!query || query.trim() === '') {
        return true
      } else {
        return _.contains(link.tags, query)
      }
    }
  }
})
