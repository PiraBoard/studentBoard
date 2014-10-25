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
      get: {
        method: 'GET',
        params: {
          id:'me'
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
  });
