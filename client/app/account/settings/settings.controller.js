'use strict';

angular.module('hermesApp')
  .controller('SettingsController', function ($scope, $q, User, Auth) {
    $scope.errors = {};

    $scope.changeSettings= function(form) {
      var promiseArray = [];
      $scope.submitted = true;
      
      if(form.$valid) {
        if ($scope.user.address) {
          promiseArray.push(Auth.changeAddress($scope.user.address));
        }
        if ($scope.user.homePhone) {
          promiseArray.push(Auth.changeHomePhone($scope.user.homePhone));
        }
        if ($scope.user.cellPhone) {
          promiseArray.push(Auth.changeCellPhone($scope.user.cellPhone));
        }

        // resolve promises
        $q.all(promiseArray).then(function () {
            $scope.message = 'You have successfully changed your settings.';
          },
          function (errors) {
            $scope.errors.other = 'There was an error saving your contact information. Please check your form. (' + errors + ')';
          }
        );
      }

      // form isn't valid
      else {
          $scope.errors.other = 'There was an error saving your contact information. Please check your form.';
      }
    };


    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
