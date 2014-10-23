'use strict';

angular.module('piraBoardApp')
  .controller('GroupsCtrl', function ($scope, $http) {
    $scope.numGroups = 0;
    $scope.numLead = 0;
    $scope.groups = [
    {name:'CSI110'}, 
    {name:'Omnicron'}, 
    {name:'Micronub'}
    ];
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


