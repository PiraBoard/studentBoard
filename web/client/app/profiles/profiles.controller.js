'use strict';

angular.module('piraBoardApp')
  .controller('ProfilesCtrl', function ($scope, $http, Auth, Image) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
    	//for testing
    	// users[0].photo = 
    	//some base64string for testing

      $scope.users = users;
    });
    
  });