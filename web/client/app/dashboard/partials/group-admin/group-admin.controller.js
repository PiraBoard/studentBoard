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

    $scope.email = function(user, callback){
      var cb = callback || angular.noop;

      //Call server with user._id
      //Server will send user an invitation email
      console.log('USER: ', user._id);

      User.sendInvite({id: user._id},{},
        function(user) {
          console.log('sent?');
          return cb(user);
        }, function(err) {
          console.log('not sent: ', err);
          return cb(err);
        }).$promise;

      // $http.put('/users/api/' + user._id + '/invite', {

      // }).
      // success(function(data) {
      //   $cookieStore.put('token', data.token);
      //   currentUser = User.get();
      //   deferred.resolve(data);
      //   return cb();
      // }).
      // error(function(err) {
      //   this.logout();
      //   deferred.reject(err);
      //   return cb(err);
      // }.bind(this));

      //Should be greyed out for users whom have been sent an invite email already
      console.log('email');
    };

    $scope.emailAllNew = function(){
      //Filter all users for users who have not yet been sent an invitation email
      //Email all of those users with an invitation email (via the server)
      console.log('email all new');
    };
  });
