'use strict';

angular.module('hermesApp')
  .controller('CalendarController', function ($scope) {
  	$scope.eventSources = [{
	    events: [{
	        title  : 'event1',
	        start  : '2014-10-01'
	    },
	    {
	        title  : 'event2',
	        start  : '2014-10-05',
	        end    : '2014-10-07'
	    },
	    {
	        title  : 'event3',
	        start  : '2014-10-09T12:30:00',
	        allDay : false // will make the time show
	    }]
	}];
  	$scope.uiConfig = {
      calendar:{
      	dayClick: $scope.alertEventOnClick,
      	editable: true,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        header:{
          left: 'month agendaWeek',
          center: 'title',
          right: 'today prev,next'
        },
        height: 'auto'
      }
    };
  });
