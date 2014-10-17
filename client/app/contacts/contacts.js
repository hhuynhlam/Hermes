'use strict';

angular.module('hermesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contacts', {
        templateUrl: 'app/contacts/contacts.html',
        controller: 'ContactsController'
      });
  });
