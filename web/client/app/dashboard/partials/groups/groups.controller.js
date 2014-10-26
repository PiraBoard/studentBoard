'use strict';

angular.module('piraBoardApp')
  .controller('GroupsCtrl', function ($scope, $http) {
    // double check to see what api returns here
    console.log('initialized GroupsCtrl');
    

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
  });
