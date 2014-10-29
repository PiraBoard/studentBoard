'use strict';

angular.module('piraBoardApp')
  .controller('InvitationCtrl', function ($http, $scope, Auth, $location, $window, $stateParams, Invitation) {
    $scope.user = {};
    $scope.errors = {};

    var userId = $stateParams.id;
    console.log('id: ', userId);
    // I set up a $resource call for this | refactor soon
    $http.get('/api/users/loginWithInvitation/' + userId).success(function(data) {
      console.log('invitation returned: ', data);
      data.password = 'password';
      Auth.login(data, function(err){
        console.log('error: ', err);
        Invitation.password = 'password';
        console.log(Invitation.password);
        $location.path("/dashboard/settings");
      });
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
