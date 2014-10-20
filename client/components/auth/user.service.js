'use strict';

angular.module('hermesApp')
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
      changeAddress: {
        method: 'PUT',
        params: {
          controller:'address'
        }
      },
      changeHomePhone: {
        method: 'PUT',
        params: {
          controller:'homePhone'
        }
      },
      changeCellPhone: {
        method: 'PUT',
        params: {
          controller:'cellPhone'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
