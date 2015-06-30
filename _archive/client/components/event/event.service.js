'use strict';

angular.module('hermesApp')
  .factory('Event', function ($resource) {
    return $resource('/api/events/:id/:controller', { id: '@_id' }, {
    	update: {
    		method: 'PUT'
    	}
    });
  });
