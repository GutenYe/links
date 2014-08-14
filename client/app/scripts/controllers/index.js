'use strict';

angular.module('App').controller('IndexCtrl', function($scope, Link) {
  $scope.links = Link.query()

  $scope.filterTag = function(query) {
    return function(link) {
      return _.contains(link.tags, query)
    }
  }
})
