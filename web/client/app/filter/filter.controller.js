'use strict';

angular.module('piraBoardApp')
  .controller('FilterCtrl', function ($scope, $http, Auth) {
    $scope.users = [];
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.numGroups = 0;
    $scope.numLead = 0;

    $http.get('/api/user').success(function(users) {
      console.log(users)
      $scope.users = users;
    });

  });
