'use strict';

angular.module('piraBoardApp')
  .controller('SettingsCtrl', function ($scope, $http, $location, $window, $timeout,  Auth, User, Invitation) {
    $scope.errors = {};
    $scope.savedSuccessfully = false;
    $scope.user = User.get();
    $scope.oldPassword = Invitation.password;

    $("#imgInput").change(function(){
        readURL(this);
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
          $('#imageView').attr('src', e.target.result);
          $scope.user.photo = e.target.result;
        }
        
        reader.readAsDataURL(input.files[0]);
      }
    }

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          $scope.user.newPassword = null;
          $scope.oldPassword = null;

          //if this is the users first time in the app (Invitation.password is not null)
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
      
      User.update({profile: $scope.user}).then(function () {
        $scope.savedSuccessfully = true;
      });
      $timeout(function() {
        $scope.savedSuccessfully=false;
      }, 1500);
    };
  });


