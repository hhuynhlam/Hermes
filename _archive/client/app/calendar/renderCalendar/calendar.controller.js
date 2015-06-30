'use strict';

angular.module('hermesApp')

  /**
   * Calendar Controller
   * @param  $scope [Angular $scope]
   * @param  $location [Angular $location]
   * @param  Event  [Angular Service]
   */
  .controller('RenderCalendarController', function ($scope, $location, Event) {
    $scope.eventSources = [];

    $scope.uiConfig = {
      calendar:{
        editable: false,
        eventClick: function (e) {
          _openEvent(e._id);
        },
        header:{
          left: 'month agendaWeek',
          center: 'title',
          right: 'today prev,next'
        },
        height: 'auto'
      }
    };
    
    var _getEvents = function ()  {
     Event.query(function (data) {
        $scope.eventSources.push(data);
      });
    };

    var _openEvent = function (eID) {
      $location.path('/calendar/editEvent').search({ eventID: eID });
    };

    (function init() {
      _getEvents();
    })();

  });
