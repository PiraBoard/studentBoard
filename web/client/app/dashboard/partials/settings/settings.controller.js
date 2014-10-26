'use strict';

angular.module('piraBoardApp')
  .controller('SettingsCtrl', function ($scope, $http, $location, $window, $timeout,  Auth, User, AllUsers, invitationFactory) {
    $scope.errors = {};
    $scope.savedSuccessfully = false;
    $scope.user = User.get();
    $scope.oldPassword = invitationFactory.password;
    // $scope.allUsers = AllUsers.query();

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          $scope.user.newPassword = null;
          $scope.oldPassword = null;

          //if this is the users first time in the app (invitationFactory.password is not null)
          //we could forward them to an edit profile page after changing their password
          //Maybe Later
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    };

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


