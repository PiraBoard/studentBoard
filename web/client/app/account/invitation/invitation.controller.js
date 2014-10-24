'use strict';

angular.module('piraBoardApp')
  .controller('InvitationCtrl', function ($http, $scope, Auth, $location, $window, $stateParams) {
    $scope.user = {};
    $scope.errors = {};

    var userId = $stateParams.id;
    console.log('id: ', userId);

    $http.get('/api/users/loginWithInvitation/' + userId).success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      console.log('invitation returned: ', awesomeThings);
    });

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
