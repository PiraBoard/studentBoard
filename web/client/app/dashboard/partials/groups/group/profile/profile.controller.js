'use strict';

angular.module('piraBoardApp')
  .controller('ProfileCtrl', function ($scope, $filter, $http, $stateParams, Auth, User) {
    $scope.groupName = $scope.groups[$stateParams.name];
    $scope.isAdmin = Auth.isAdmin;
    $scope.users = User.query();
  });

