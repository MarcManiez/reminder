angular.module('remind.er.list', [])

.controller('listController', function ($scope, Requests, Time) {
  $scope.activities = [];
  Requests.getActivities({status: true})
    .then(results => {
      console.log(results);
      $scope.activities = results;
      for (let activity of $scope.activities) {
        activity.completed = false;
        activity.time = 0;
        if (activity.executionDate) {
          activity.worker = new Worker('../app/workers/timeWorker.js');
          activity.worker.addEventListener('message', function(e) {
            if (e.data) {
              console.log(e.data);
              activity.time = e.data;
              activity.completed = true;
              $scope.$apply();
              if (e.data === 'go reset fool!') {
                activity.completed = false;
                // Requests.updateModel([activity._id, {executionDate: null}] );
              }
            }
          }, false);
          activity.worker.postMessage(JSON.stringify(activity));
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  $scope.toggle = activity => {
    Requests.toggleStatus(activity);
  };
  $scope.completeActivity = (model, options) => {
    Requests.updateModel(model, options);
    model.completed = true;
    model.time = 0;
    model.worker = new Worker('../app/workers/timeWorker.js');
    model.worker.addEventListener('message', function(e) {
      console.log(e.data);
      model.time = e.data;
      $scope.$apply();
    }, false);
    model.worker.postMessage(JSON.stringify(model));
  };
  $scope.makeDate = Time.makeDate;
});