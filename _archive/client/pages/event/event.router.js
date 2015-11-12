'use strict';

define(function (require) {
    var auth = require('auth');
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var EventCalendarViewModel = require('event-calendar.viewmodel');
    var EventDetailViewModel = require('event-detail.viewmodel');
    var EventListViewModel = require('event-list.viewmodel');
    var NavbarViewModel = require('navbar.viewmodel');

    var eventRouter = function (app) {   
        
        app.get('/#/event', function (context) {
            if(!auth.isLoggedIn()) { window.location.replace(window.env.CLIENT_HOST + '/login'); }
            require(['text!pages/event/event-list.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new EventListViewModel(), document.getElementById('Event'));
            });
        });
        
        app.get('/#/event/calendar', function (context) {
            if(!auth.isLoggedIn()) { window.location.replace(window.env.CLIENT_HOST + '/login'); }
            require(['text!pages/event/event-calendar.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new EventCalendarViewModel(), document.getElementById('EventCalendar'));
            }.bind(this));
        });

        app.get('/#/event/:id', function (context) {
            if(!auth.isLoggedIn()) { window.location.replace(window.env.CLIENT_HOST + '/login'); }
            require(['text!pages/event/event-detail.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new EventDetailViewModel(this.params.id), document.getElementById('EventDetail'));
            }.bind(this));
        });

    };

    return eventRouter;

});