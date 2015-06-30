'use strict';

angular.module('hermesApp')
  .controller('SettingsController', function ($scope, $q, User, Auth) {
    
    var _this = this;
    var _defaultForm = {
      address: '',
      homePhone: '',
      cellPhone: '',
      oldPassword: '',
      newPassword: ''
    };

    $scope.errors = {}; 
    $scope.showChangePassword = false;

    $scope.toggleChangePassword = function() {
      _this._resetForm();
      $scope.showChangePassword = !$scope.showChangePassword;
    };

    $scope.changeContactInformation = function(form) {
      var promiseArray = [];
      $scope.submitted = true;
      _this._resetMessages();

      // check what input has values and update only those settings
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
            _this._resetForm();
            $scope.message = 'You have successfully changed your contact information.';
          },
          function (errors) {
            $scope.error = 'There was an error saving your contact information. Please check your form. (' + errors + ')';
          }
        );
      }

      // form isn't valid
      else {
          $scope.error = 'There was an error saving your contact information. Please check your form.';
      }
    };

    $scope.changePassword = function(form) {
      _this._resetMessages();

      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          _this._resetForm();
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.error= 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    _this._resetForm = function() {
      $scope.user = angular.copy(_defaultForm);
      $scope.changePasswordForm.$setPristine();
      $scope.changeInfoForm.$setPristine();
      _this._resetMessages();
    };

    _this._resetMessages = function() {
      $scope.message = '';
      $scope.error = '';
    };

  });
