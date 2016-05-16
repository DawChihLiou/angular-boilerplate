var angular        = require('angular');
var MainController = require('./home/controllers/MainController');

var app = angular.module('app', []);

app.controller('MainController', ['$scope', MainController]);
