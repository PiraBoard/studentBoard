'use strict';

angular.module('piraBoardApp')
.factory('Group', function ($resource) {
  return {
    getAllMembers: function (ofGroup) {
      var endpoint = $resource('/api/users/getUsersOfGroup/:name', {name: ofGroup});
      return endpoint.query();
    },
    getActiveMembers: function (group) {},
    create: function () {
      return $resource('/api/users/userGroup/:name');
    },
  }
})
