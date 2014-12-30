'use strict';

angular.module('hermesApp').config(function ($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarController',
        authenticate: true
    });
});
