'use strict';

angular.module('hermesApp')

  /**
   * Calendar Controller
   * @param  $scope [Angular $scope]
   * @param  $location [Angular $location]
   * @param  Event  [Angular Service]
   */
  .controller('CreateEventController', function ($scope, $location, Event) {

      $scope.newEvent = {
        startTime: new Date(),
        endTime: new Date()
      }; 

      $scope.createEvent = function (isValid)  {
        $scope.submitted = true;

        // concatenate time to date to be stored
        if ($scope.newEvent.start && $scope.newEvent.startTime) {
          $scope.newEvent.start.setUTCHours($scope.newEvent.startTime.getHours());
          $scope.newEvent.start.setUTCMinutes($scope.newEvent.startTime.getMinutes());
        }

        if ($scope.newEvent.end && $scope.newEvent.endTime) {
          $scope.newEvent.end.setUTCHours($scope.newEvent.endTime.getHours());
          $scope.newEvent.end.setUTCMinutes($scope.newEvent.endTime.getMinutes());
        }

        // check endDate is after startDate
        if ($scope.newEvent.end < $scope.newEvent.start) {
          $scope.error = 'End date must be on or after start date.';
        }
        else if (!isValid) {
          $scope.error = 'Please check your form.';
        }
        else {
          $scope.error = '';
          Event.save($scope.newEvent, function () {
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

  });
