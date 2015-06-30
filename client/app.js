'use strict';

define(function (require) {
	var ko = require('knockout');
	var sammy = require('sammy');
	var sandbox = require('sandbox');
	require('bootstrap');

	// set environment variables
	// var _env = require('json!env.json');
	// window.env = window.env || {};
	// sandbox.util.assign(window.env, _env);

	var AppViewModel = function () {
		this.isReady = ko.observable(false);
	};

	// define a new Sammy.Application bound to the #MainView DOM
	var app = sammy('#MainView');

	// -- Routes -- //
	// require('about.router')(app);
	// require('event.router')(app);
	require('home.router')(app);
	// require('login.router')(app);
	// require('member.router')(app);
	// require('profile.router')(app);

	// 404 Error
	app.notFound = function () {
		window.location.replace( window.env.CLIENT_HOST + '/' );
	};

	// Override this function so that Sammy doesn't mess with forms
    app._checkFormSubmission = function() { return false; };

    // Override swap function for post-actions and transitions
	app.swap = function(content, callback) {
		
		// replace html
		app.$element().html(content);

		// check for content
		if($('.content').html().trim()) {
			$('.content').css('display', 'block');
		}

		// apply callback
		if (callback) { callback.apply(); }
	};

	// run app
	$(function() { 
		ko.applyBindings(new AppViewModel(), document.getElementById('MainView'));
		app.run(); 
	});
});