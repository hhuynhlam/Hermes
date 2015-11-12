'use strict';

define(function (require) {
	var ko = require('knockout');

	var AboutViewModel = function () {
        this.kat = ko.observable();
	};

	return AboutViewModel;
});