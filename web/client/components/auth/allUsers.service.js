'use strict';

angular.module('piraBoardApp')
.factory('AllUsers', function ($resource) {
  return $resource('api/users', {
    query: {
      method: 'GET',
      isArray: false
    }
  });
});
