'use strict';

angular.module('hermesApp')
  .controller('NavbarController', function ($scope, $location, Auth) {
    $scope.menu = [{
      title: 'Home',
      link: '/' 
    }, 
    // {
    //   title: 'Photos',
    //   link: '/photos'
    // }, 
    {
      title: 'Contacts',
      link: '/contacts'
    }];

    $scope.isCollapsed = true;

    // not used yet, but will once we get a Users API
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });