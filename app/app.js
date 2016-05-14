var angular        = require('angular');
var MainController = require('./home/MainController');

var app = angular.module('app', []);

app.controller('MainController', ['$scope', MainController]);
