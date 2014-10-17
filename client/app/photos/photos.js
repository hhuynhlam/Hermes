'use strict';

angular.module('hermesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/photos', {
        templateUrl: 'app/photos/photos.html',
        controller: 'PhotosController'
      });
  });
