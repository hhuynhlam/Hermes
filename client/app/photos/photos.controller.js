'use strict';

angular.module('hermesApp')
  .controller('PhotosController', function ($scope, $http) {
		$http.get('/api/photos')
		.success(function(data) {
			$scope.photos = data;
		})
		.error(function(err) {
			console.error('There is an error retrieving photos: ' + err);
		});
  });
