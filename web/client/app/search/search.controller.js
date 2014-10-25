'use strict';

angular.module('piraBoardApp')
  .controller('SearchCtrl', function ($scope, $http, Auth) {
    
    //WHAT IS THE API URL?
    $http.get('/api/user').success(function(users) {
      $scope.allusers = users; 
    });

  });
