'use strict';

angular.module('hermesApp').config(function ($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'app/calendar/renderCalendar/calendar.html',
        controller: 'RenderCalendarController',
        authenticate: true
    });

    $routeProvider.when('/calendar/editEvent', {
        templateUrl: 'app/calendar/editEvent/editEvent.html',
        controller: 'EditEventController',
        authenticate: true
    });

    $routeProvider.when('/calendar/createEvent', {
        templateUrl: 'app/calendar/createEvent/createEvent.html',
        controller: 'CreateEventController',
        authenticate: true
    });
});
