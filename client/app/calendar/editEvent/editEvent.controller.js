'use strict';

angular.module('hermesApp')

  /**
   * Calendar Controller
   * @param  $scope [Angular $scope]
   * @param  $routeParams [Angular $routeParams]
   * @param  $location [Angular $location]
   * @param  Event  [Angular Service]
   */
  .controller('EditEventController', function ($scope, $routeParams, $location, Event) {
    
    $scope.cancelDelete = function () {
      $scope.alertDelete = false;
      event.preventDefault();
    };
    
    $scope.editEvent = function (isValid)  {
      $scope.submitted = true;

      // Safety measure: construct new Date object from stored string values
      $scope.edittedEvent.start = new Date($scope.edittedEvent.start);
      $scope.edittedEvent.end = new Date($scope.edittedEvent.end);

      // concatenate time to date to be stored
      if ($scope.edittedEvent.start && $scope.edittedEvent.startTime) {
        $scope.edittedEvent.start.setUTCHours($scope.edittedEvent.startTime.getUTCHours());
        $scope.edittedEvent.start.setUTCMinutes($scope.edittedEvent.startTime.getUTCMinutes());
      }

      if ($scope.edittedEvent.end && $scope.edittedEvent.endTime) {
        $scope.edittedEvent.end.setUTCHours($scope.edittedEvent.endTime.getUTCHours());
        $scope.edittedEvent.end.setUTCMinutes($scope.edittedEvent.endTime.getUTCMinutes());
      }

      // check endDate is after startDate
      if ($scope.edittedEvent.end < $scope.edittedEvent.start) {
        $scope.error = 'End date must be on or after start date.';
      }
      else if (!isValid) {
        $scope.error = 'Please check your form.';
      }
      else {
        $scope.error = '';
        Event.update($scope.edittedEvent, function () {
          $location.path('/calendar');
        });
      }

    };

    $scope.deleteEvent = function () {
      Event.delete({id: $routeParams.eventID});
      $location.path('/calendar');
    };
    
    $scope.openConfirmDelete = function () {
      $scope.alertDelete = true;
      event.preventDefault();
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

    var _getEvent = function (eventId) {
      Event.get({id: eventId}, function (data) {
        var startDate, endDate;

        // construct Date objects from data
        if (data.start) {
          startDate = new Date(data.start);
          startDate.setUTCHours(startDate.getUTCHours());
          startDate.setUTCMinutes(startDate.getUTCMinutes());
        }

        if (data.end) {
          endDate = new Date(data.end);
          endDate.setUTCHours(endDate.getUTCHours());
          endDate.setUTCMinutes(endDate.getUTCMinutes());
        }

        // populate $scope model for view rendering
        $scope.edittedEvent = {
          _id: data._id,
          title: data.title,
          start: new Date(data.start).toDateString(),
          startTime: startDate,
          end: new Date(data.end).toDateString(),
          endTime: endDate,
        };

        // FIXME: (BUG) date renders one day off.
        // var _sDate = new Date($scope.edittedEvent.start);
        // var _eDate = new Date($scope.edittedEvent.end);

        // _sDate.setDate(_sDate.getDate() + 1);
        // _eDate.setDate(_eDate.getDate() + 1);

        // $scope.edittedEvent.start = _sDate.toDateString();
        // $scope.edittedEvent.end = _eDate.toDateString();

      });
    };

    (function init() {
      if ($routeParams.eventID) {
        _getEvent($routeParams.eventID);
      }
      else {
        console.error('No event found.'); }
    })();

  });
