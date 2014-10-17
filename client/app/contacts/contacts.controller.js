'use strict';

angular.module('hermesApp')
  .controller('ContactsController', function ($scope, User) {
    
    // Use the User $resource to fetch all users
    $scope.users = User.query();
  });
