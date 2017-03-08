angular.module('remind.er.home', [])

.controller('homeController', function ($scope, Requests) {
  $scope.activity = {
    title: '',
    description: '',
    times: '',
    period: '',
    cost: ''
  };
  $scope.sendActivity = Requests.sendActivity;
  $scope.activities = [];
  Requests.getActivities()
    .then(results => {
      console.log(results);
      $scope.activities = results;
    })
    .catch(err => {
      console.log(err);
    });
  $scope.toggle = activity => {
    Requests.toggleStatus(activity);
  };
});