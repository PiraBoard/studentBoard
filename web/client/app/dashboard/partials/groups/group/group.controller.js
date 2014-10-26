'use strict';

angular.module('piraBoardApp')
  .controller('GroupCtrl', function ($scope, $http, $filter, $stateParams, Auth, User) {
    $scope.groupName = $stateParams.name;
    $scope.isAdmin = Auth.isAdmin;
    $scope.users = User.query();

    $scope.getActiveUsersOfGroup = function(){

      $http.get('/api/users/getActiveUsersOfGroup/' +  $scope.groupName, {
      }).
      success(function(data) {
        if(data.length !== $scope.users.length){
          $scope.users = data;
          $scope.setGroupMembers($scope.groupName, data);
        }
      }).
      error(function(err) {
        console.log('Error getting users from ' + $scope.groupName);
        console.log(err);
      }.bind(this));
    };

    $scope.getInvitedUsersOfGroup = function(){

      $http.get('/api/users/getInvitedUsersOfGroup/' +  $scope.groupName, {
      }).
      success(function(data) {
        if(data.length !== $scope.users.length){
          $scope.users = data;
          $scope.setGroupInvitations($scope.groupName, data);
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
    
    $scope.getActiveUsersOfGroup();
    $scope.getInvitedUsersOfGroup();

    $scope.createUser = function(name, email){
      console.log('group create user');
      var newUser = {
        name:name,
        email:email,
        group: $scope.groupName
      };

      console.log('creating user: ', newUser);

      $scope.email = '';
      $scope.name = '';

      $http.post('/api/users/', newUser
      ).
      success(function(data) {
        console.log('Created user');
        console.log(data);
        // var header = angular.element('');
        // var invited = angular.element('<tr><td>'+name+'</td><td>' + email +'</td><td colspan="2">Invitation Sent</td></tr>');
        // angular.element(header).appendTo('#invitation-list');
        // angular.element(invited).appendTo('#invitation-list');
        $scope.getInvitedUsersOfGroup();
      }).
      error(function(err) {
        console.log('Error creating user');
        console.log(err);
        alert(err);
      }.bind(this));
    };

    // $scope.inviteEmail = function (email) {
    //   // send email invite to email
    //   var invited = angular.element('<tr><td></td><td>' + email +'</td><td colspan="2">PENDING</td></tr>');
    //   angular.element(invited).appendTo('#member-list');
    //   $scope.email = '';
    // };
  })
.filter('lastname', function () {
  return function (input) {
    return input.split('')[1].sort();

  }
});

