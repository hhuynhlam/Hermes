'use strict';

define(function (require) {
    var $= require('jquery');
    var auth = require('auth');
    var sandbox = require('sandbox');

    var EventActionViewModel = function () {
        this.currentUser = auth.currentUser();
    };

    EventActionViewModel.prototype.add = function (viewmodel, event) {
        this.postAction({
            type: 'add',
            event: event,
            topic: 'shift.add'
        })
        .catch(function (err) {
            console.error('Error: Could not add user to shift (', err, ')');
        })
        .done();
    };

    EventActionViewModel.prototype.addWaitlist = function (viewmodel, event) {
        this.postAction({
            type: 'addWaitlist',
            event: event,
            topic: 'shift.waitlist.add'
        })
        .catch(function (err) {
            console.error('Error: Could not waitlist to shift (', err, ')');
        })
        .done();
    };

    EventActionViewModel.prototype.removeWaitlist = function (viewmodel, event) {
        this.postAction({
            type: 'removeWaitlist',
            event: event,
            topic: 'shift.waitlist.remove'
        })
        .catch(function (err) {
            console.error('Error: Could not remove from waitlist (', err, ')');
        })
        .done();
    };

    EventActionViewModel.prototype.remove = function (viewmodel, event) {
        this.postAction({
            type: 'remove',
            event: event,
            topic: 'shift.remove'
        })
        .catch(function (err) {
            console.error('Error: Could not remove user to shift (', err, ')');
        })
        .done();
    };

    EventActionViewModel.prototype.postAction = function (options) {
        var $target = $($(options.event)[0].target),
            data = {
                apiKey: window.env.API_KEY,
                user: this.currentUser.Id,
                shift: $target.attr('data-shiftId'),
                event: $target.attr('data-eventId')
            }, 
            url;

        // setup post data based on type of request
        switch(options.type) {
            case 'add':
                url = window.env.SERVER_HOST + '/shift/user/signups/add';
                data.driver = 0;
                data.timestamp = sandbox.date.toUnix();
                break;
            case 'remove':
                url = window.env.SERVER_HOST + '/shift/user/signups/delete';
                break;
            case 'addWaitlist':
                url = window.env.SERVER_HOST + '/waitlist/add';
                data.timestamp = sandbox.date.toUnix();
                break;
            case 'removeWaitlist':
                url = window.env.SERVER_HOST + '/waitlist/delete';
                data.timestamp = sandbox.date.toUnix();
                break;
        }

        // http post and setup callback
        return sandbox.http.post(url, data)
            .then(function (data) {
                sandbox.msg.publish($target.attr('data-shiftId') + '.' + options.topic, data);
            });
    };

    return EventActionViewModel;
});