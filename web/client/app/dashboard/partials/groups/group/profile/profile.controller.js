'use strict';

angular.module('piraBoardApp')
.controller('ProfileCtrl', function ($scope, $filter, $http, $stateParams, Auth, User) {
  $scope.groupName = $scope.groups[$stateParams.name];
  $scope.isAdmin = Auth.isAdmin;
  $scope.user = User.get()

  $scope.update = function(form) {
    $scope.submitted = true;
    User.update({profile: $scope.user}).$promise.then(function () {
      $scope.savedSuccessfully = true;
    });
    $timeout(function() {
      $scope.savedSuccessfully=false;
    }, 1500);
  };
});
