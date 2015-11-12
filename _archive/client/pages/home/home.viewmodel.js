'use strict';

define(function (require) {
    var auth = require('auth');
	var ko = require('knockout');

	var HomeViewModel = function () {
        this.loggedIn = auth.isLoggedIn();
	};

	return HomeViewModel;
});