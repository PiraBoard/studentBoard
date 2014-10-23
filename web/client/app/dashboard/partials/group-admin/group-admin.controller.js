'use strict';

angular.module('piraBoardApp')
  .controller('GroupAdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.email = function(user){
      //Call server with user._id
      //Server will send user an invitation email

      //Should be greyed out for users whom have been sent an invite email already
      console.log('email');
    };

    $scope.emailAllNew = function(){
      //Filter all users for users who have not yet been sent an invitation email
      //Email all of those users with an invitation email (via the server)
      console.log('email all new');
    };
  });
