'use strict';

define(function (require) {
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var ShiftViewModel = require('event-shift.viewmodel');

    var EventDetailViewModel = function (eventId) {
        this.shiftViewModel = ko.observable(new ShiftViewModel(eventId));
        this.event = ko.observable({});

        // init event
        this.getEvent(eventId)
        .then(function (_event) {
            _event = _event[0];
            _event.date = (_event.Date) ? sandbox.date.parseUnix(_event.Date).format('MM/DD/YYYY') : '';
            this.event(_event);
        }.bind(this))
        .catch(function (err) {
            console.error('Error: Cannot get event (', err, ')');
        })
        .done();
    };

    EventDetailViewModel.prototype.getEvent = function (eventId) {
        var data, url;
        url = window.env.SERVER_HOST + '/event';
        data = {
            apiKey: window.env.API_KEY,
            id: eventId
        };
        return sandbox.http.get(url, data);
    };

    return EventDetailViewModel;
});