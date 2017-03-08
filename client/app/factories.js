angular.module('remind.er.factories', [])

.factory('Requests', $http => {
  const sendActivity = activity => {
    return $http({
      method: 'POST',
      url: '/home',
      data: JSON.stringify(activity)
    })
    .then(res => res.data);

  };
  const getActivities = (options) => {
    return $http({
      method: 'GET',
      url: '/home',
      headers: options ? options : null
    })
    .then(res => res.data);
  };
  const toggleStatus = activity => {
    return $http({
      method: 'PUT',
      url: '/home/update',
      data: JSON.stringify(activity)
    })
    .then(res => res.data);
  };
  const updateModel = (model, options) => {
    return $http({
      method: 'PUT',
      url: '/home/updateModel',
      data: JSON.stringify([model, options])
    })
    .then(res => res.data);
  };
  return {
    sendActivity: sendActivity,
    getActivities: getActivities,
    toggleStatus: toggleStatus,
    updateModel: updateModel
  };
})
.factory('Time', () => {
  const makeDate = () => {
    return new Date().toString();
  };
  return {
    makeDate: makeDate
  };
});