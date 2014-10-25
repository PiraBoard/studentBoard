'use strict';

angular.module('piraBoardApp')
  .controller('SettingsCtrl', function ($scope, Auth, User, $location, $window, $timeout) {
    $scope.errors = {};
    $scope.savedSuccessfully = false;
    $scope.user = User.get();
    //Should populate text fields based on user info
    //retrieved from server

    $scope.save = function(form) {
      $scope.submitted = true;

      //Should save user changes,
      //not create a new user *** FIX *** once database is enabled
      if(form.$valid) {
        $scope.savedSuccessfully = true;

        //Tells the user that the data was saved successfully
        //Removes the message after a few seconds

        $timeout(function(){
          $scope.savedSuccessfully=false;
        }, 3000);
      }
    };
  });


