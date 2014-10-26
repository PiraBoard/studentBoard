'use strict';

angular.module('piraBoardApp')
  .controller('GroupCtrl', function ($scope, $http, $filter, $stateParams, Auth, User) {
    $scope.groupName = $stateParams.name;
    $scope.isAdmin = Auth.isAdmin;
    $scope.users = User.query();

    $scope.getUsersOfGroup = function(){

      $http.get('/api/users/getUsersOfGroup/' +  $scope.groupName, {
      }).
      success(function(data) {
        console.log('Received users from ' + $scope.groupName);
        console.log(data);
        if(data.length !== $scope.users.length){
          $scope.users = data;
          $scope.setGroupMembers($scope.groupName, data);
          // $scope.addGroupMembers($scope.groupName, data);
        }
      }).
      error(function(err) {
        console.log('Error getting users from ' + $scope.groupName);
        console.log(err);
      }.bind(this));
    };

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
    
    $scope.getUsersOfGroup();


    $scope.inviteEmail = function (email) {
      // send email invite to email
      var invited = angular.element('<tr><td></td><td>' + email +'</td><td colspan="2">PENDING</td></tr>')
      angular.element(invited).appendTo('#member-list');
      $scope.email = '';
    };
  })
.filter('lastname', function () {
  return function (input) {
    return input.split('')[1].sort();

  }
});

