var angular = require('angular');

var app = angular.module('app', []);

app.controller('MainController', function () {
  $scope.message = 'Angular works';
});
