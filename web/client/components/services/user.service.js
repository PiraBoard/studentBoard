'use strict';

angular.module('piraBoardApp')
.factory('User', function ($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  },
  {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    query: {
      method: 'GET',
      isArray: true
    },
    update: {
      method: 'PUT',
      params: {
        id: 'me',
        controller: 'update'
      }
    },
    sendInvitation: {
      method: 'PUT',
      params: {
        controller: 'invite'
      }
    },
    consumeInvitation: {
      method: 'GET',
      params: {
        // {id: new_user} must be passed into function call
        //this name should be simplified
        controller: 'loginWithInvitation'
      }
    }
  });
})
