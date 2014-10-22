'use strict';

angular.module('piraBoardApp')
  .controller('PageCtrl', function ($scope, Auth, $location, $window, $timeout) {
    $scope.errors = {};
    $scope.user = {
      name: "Little Bobby Tables"
    };
    $scope.imagePath = 'images/forever_alone.jpg';
  });


