'use strict';

angular.module('hermesApp')
  .controller('CalendarController', function ($scope, $modal, Event) {

    $scope.events = [];
    $scope.eventSources = [];
    $scope.startOpened = false;
    $scope.endOpened = false;
  	
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

    $scope.modal = {
        title: 'Create an Event',
        body: 'Hello World!'
    };

    // $scope.addEvent = function ()  {
    //   Event.save({
    //     name: 'Event 1',
    //     info: 'A Test Event',
    //     active: true
    //   });
    // };

    $scope.createEventModal = function(size) {
      _openModal(size);
    };

    $scope.showCalendar = function (option) {
      if (option === 'start') {
        $scope.startOpened = true;
      }
      else if (option === 'end') {
        $scope.endOpened = true;
      }
    };

    var _openModal = function (size) {
      $modal.open({
        templateUrl: 'components/modal/modal.html',
        controller: 'CalendarController',
        size: size,
        scope: $scope
      });
    };

    var _getEvents = function ()  {
      Event.query(function (data) {
        data.forEach(function (item) {
          $scope.events.push(item);
        });
      });
    };

  });
