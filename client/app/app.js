angular.module('remind.er', [
  'remind.er.home',
  'remind.er.list',
  'remind.er.factories',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/home/home.html',
      controller: 'homeController'
    })
    .when('/list', {
      templateUrl: 'app/list/list.html',
      controller: 'listController'
    })
    .otherwise({
      redirectTo: '/home'
    });
})
.controller('appController', function ($scope, $location) {
  $scope.route = function(route) {
    $location.path(route);
  };
  // console.log(moment);
});