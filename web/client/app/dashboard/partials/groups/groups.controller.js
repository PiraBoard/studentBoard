'use strict';

angular.module('piraBoardApp')
  .controller('GroupViewCtrl', function ($scope, $http) {
    
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


