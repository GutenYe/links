'use strict';

angular.module('App').controller('IndexCtrl', ['$scope', 'Link', function($scope, Link) {
  $scope.links = Link.query()

  $scope.filterTag = function(query) {
    return function(link) {
      return _.isBlank(query) && true || _.contains(link.tags, query)
    }
  }

  $scope.visited = function(link) {
    link.visited = link.visited + 1
    link.visitedAt = new Date()
    link.$save()
  }
}])
