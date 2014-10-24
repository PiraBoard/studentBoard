'use strict';

angular.module('piraBoardApp')
  .controller('GroupsCtrl', function ($scope, $http) {
    $scope.groups = [];
    $scope.numGroups = 0;
    $scope.numLead = 1;
    // double check to see what api returns here
    $http.get('/api/groups').success(function(groups) {
      $scope.groups = groups;
      if (groups.leader) {
        $scope.numLead++;
      } else {
        $scope.numGroups++;
      }
    });
  });


