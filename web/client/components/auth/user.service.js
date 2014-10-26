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
        controller:'password'
      }
    },
    //used for getting user information
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    // used for updating user profile
    update: {
      method: 'PUT',
      params: {
        id: 'me',
        controller:'update'
      }
    },
    sendInvite: {
      method: 'PUT',
      params: {
        // id: '54481e9e30ec68af54d9f680',//testing only, remove soon
        controller:'invite'
      }
    }
  });
})
