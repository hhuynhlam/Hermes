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
    $scope.newEvent = {}; 
    
    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'month agendaWeek',
          center: 'title',
          right: 'today prev,next'
        },
        height: '500'
      }
    };

    $scope.createEvent = function (isValid)  {
      $scope.submitted = true;
      
      // check endDate is after startDate
      if ($scope.newEvent.end < $scope.newEvent.start) {
        $scope.error = 'End date must be on or after start date.';
      }
      else if (!isValid) {
        $scope.error = 'Please check your form.';
      }
      else {
        $scope.error = '';
      }

    };

    $scope.showCalendar = function (type) {
      if (!type) {
        return;
      }
      else if (type === 'start') {
        $scope.startDateOpened = true;
      }
      else if (type === 'end') {
        $scope.endDateOpened = true;
      }
    };

    $scope.openModal = function (options) {
      var modalInstance = {},
          _templateURL = '';
      $scope.modal = { title: 'Create an Event' };

      // setup modal template path
      switch (options.type || '') {
        case 'createEvent':
          _templateURL = 'createEvent.html';
          break;
        
        default:
          _templateURL = 'default.html';
          break;
      }

      // open modal
      modalInstance = $modal.open({
        templateUrl: 'components/modal/templates/' + _templateURL,
        controller: 'CalendarController',
        size: options.size,
        scope: $scope
      });

      // setup modal instance controls
      modalInstance.opened.then(function () {
        $scope.dismissModal = modalInstance.dismiss;
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
