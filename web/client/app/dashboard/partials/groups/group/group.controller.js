'use strict';

angular.module('piraBoardApp')
.controller('GroupCtrl', function ($scope, $http, $filter, $stateParams, Auth, User) {
  $scope.groupName = $stateParams.name;
  $scope.isAdmin = Auth.isAdmin;
  $scope.users = User.query();

    // this function does not work
    $scope.delete = function(user) {
      if ( confirm('Really remove ' + user.name + '?')) {
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      }
    };

    $scope.createUser = function(name, email){
      var newUser = {
        name:name,
        email:email,
        group: $scope.groupName
      };

      $http.post('/api/users/', newUser
        ).
      success(function(data) {
        console.log('Created user:', data);
      }).
      error(function(err) {
        console.log('Error creating user:', err);
        console.log(err);
        alert(err);
      }.bind(this));
    };
  })