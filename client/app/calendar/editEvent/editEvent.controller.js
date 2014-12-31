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

    $scope.edittedEvent = {
      startTime: new Date(),
      endTime: new Date()
    }; 

    $scope.editEvent = function (isValid)  {
      $scope.submitted = true;

      // concatenate time to date to be stored
      if ($scope.edittedEvent.start && $scope.edittedEvent.startTime) {
        $scope.edittedEvent.start.setUTCHours($scope.edittedEvent.startTime.getHours());
        $scope.edittedEvent.start.setUTCMinutes($scope.edittedEvent.startTime.getMinutes());
      }

      if ($scope.edittedEvent.end && $scope.edittedEvent.endTime) {
        $scope.edittedEvent.end.setUTCHours($scope.edittedEvent.endTime.getHours());
        $scope.edittedEvent.end.setUTCMinutes($scope.edittedEvent.endTime.getMinutes());
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
        $scope.edittedEvent = {
          _id: data._id,
          title: data.title,
          start: data.start,
          end: data.end
        }; 
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
