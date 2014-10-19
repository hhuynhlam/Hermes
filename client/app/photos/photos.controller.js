'use strict';

angular.module('hermesApp')
  .controller('PhotosController', function ($scope, $http) {

  		// load photos from server, passing cloudinary options
		$http.get('/api/photos?width=400&crop=scale')
		.success(function(data) {
			$scope.photos = data;
		})
		.error(function(err) {
			console.error('There is an error retrieving photos: ' + err);
		});
  });
