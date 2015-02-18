'use strict';

window.pd = function() { console.log.apply(console, arguments) }

angular.module('app', ['ngResource', 'ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/analysis', {
      templateUrl: 'app/analysis/analysis.html',
      controller: 'AnalysisCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
})
