'use strict';

angular.module('piraBoardApp')
.factory('Group', function ($resource) {
  return {
    getAllMembers: function (ofGroup) {
      var endpoint = $resource('/api/users/getUsersOfGroup/:name', {name: ofGroup});
      return endpoint.query();
    },
    getActiveMembers: function (ofGroup) {
      var endpoint = $resource('/api/users/getActiveUsersOfGroup/:name', {name: ofGroup});
      return endpoint.query();
    },
    getInvitedMembers: function (ofGroup) {
      var endpoint = ('/api/users/getInvitedUsersOfGroup/:name', {name: ofGroup});
      return endpoint.query();
    },
    create: function (ofGroup) {
      return $resource('/api/users/userGroup/:name', {name: ofGroup});
    },
  }
})
