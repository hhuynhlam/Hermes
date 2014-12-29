'use strict';

angular.module('hermesApp')

  /**
   * Calendar Controller
   * @param  $scope [Angular $scope]
   * @param  $modal [Bootstrap $modal]
   * @param  Event  [Angular Service]
   */
  .controller('CalendarController', function ($scope, $modal, Event) {

    $scope.eventSources = [];
    $scope.event = {};  
    
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

    $scope.createEvent = function (isValid, param1, param2)  {
      if (!isValid) {
        $scope.error = 'The form is not valid.';
      }
    };

    $scope.showCalendar = function (type) {
      if (type && type === 'start') {
        $scope.startDateOpened = true;
      }
      else if (type && type === 'end') {
        $scope.endDateOpened = true;
      }
    };

    $scope.openModal = function (options) {
      var _templateURL;
      $scope.modal = { title: 'Create an Event' };

      switch (options.type || '') {
        case 'createEvent':
          _templateURL = 'createEvent.html';
          break;
        
        default:
          _templateURL = 'default.html';
          break;
      }

      $modal.open({
        templateUrl: 'components/modal/templates/' + _templateURL,
        controller: 'CalendarController',
        size: options.size,
        scope: $scope
      });

    };

    var _getEvents = function ()  {
      Event.query(function (data) {
          $scope.eventSources.push(data);
      });
    };

    (function init() {
      _getEvents();
    })();

  });
