'use strict';

angular.module('piraBoardApp')
  .controller('GroupCtrl', function ($scope, $http, $stateParams) {
    
    $scope.groupName = $scope.groups[$stateParams.name];

  });


