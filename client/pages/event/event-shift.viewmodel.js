'use strict';

define(function (require) {
    var auth = require('auth');
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var EventActionViewModel = require('event-action.viewmodel');

    var EventShiftViewModel = function (eventId) {
        this.eventActionViewModel = ko.observable(new EventActionViewModel());
        this.currentUser = auth.currentUser();
        this.shifts = ko.observableArray([]);
        this.signups = ko.observable({});
        this.waitlist = ko.observable({});

        this.eventId = eventId;

        // init shifts
        this.getData('shifts', eventId)
        .then(function (shifts) {
            return this.disableShifts(shifts);
        }.bind(this))
        .then(function (shifts) {
            shifts.forEach(function (s) {
                this.formatShiftData(s);
                this.setShiftObservables(s);
            }, this);

            this.shifts(shifts);
            this.getSignups(shifts);
            this.getWaitlists(shifts);
        }.bind(this))
        .catch(function (err) {
            console.error('Error: Cannot get shifts (', err, ')');
        })
        .done();
    };

    EventShiftViewModel.prototype.getSignups = function (shifts) {
        shifts.forEach(function (shift) {           // for each shift
            this.getData('signups', shift.Id)       // get the signups
            .then(function (signups) {
                var result = {};
                result[shift.Id] = signups;
                this.signups(sandbox.util.assign(this.signups, result));
                this.setSignUpAvailabilityForShift(this.currentUser, shift, signups);
            }.bind(this))
            .catch(function (err) {
                console.error('Error: Cannot get signups (', err, ')');
            })
            .done();

            // setup signup, remove, waitlist, remove form waitlist
            this.setActionSubscriptions(shift);

        }, this);
    };

    EventShiftViewModel.prototype.setSignUpAvailabilityForShift = function (user, shift, signups) {
        var currentShift = sandbox.util.find(this.shifts(), function (s) { return s.Id === shift.Id; }), 
            userSignedUp = sandbox.util.find(signups, function (su) { return su.User === user.Id; }, this);

        // find out if shift is full
        if(signups.length >= shift.Cap && shift.Cap != 0 && shift.Cap != -1) { currentShift.isFull(true); }

        // find out if current user already signup to shift
        if(userSignedUp) { currentShift.isSignedUp(true); }
    };

    EventShiftViewModel.prototype.getWaitlists = function (shifts) {
        shifts.forEach(function (shift) { 
            this.getData('waitlist', shift.Id)       
            .then(function (waitlist) {
                var result = {};
                result[shift.Id] = waitlist;
                this.waitlist(sandbox.util.assign(this.waitlist, result));
                this.setWaitlistAvailabilityForShift(shift, waitlist);

                this.setShiftsToReady(shifts);            
            }.bind(this))
            .catch(function (err) {
                console.error('Error: Cannot get waitlist (', err, ')');
            })
            .done();    
        }, this);
    };

    EventShiftViewModel.prototype.setWaitlistAvailabilityForShift = function (shift, waitlist) {
        var currentShift = sandbox.util.find(this.shifts(), function (s) { return s.Id === shift.Id; }), 
            userWaitlisted = sandbox.util.find(waitlist, function (w) { return w.Id === this.currentUser.Id; }, this);

        // find out if current user already waitlisted to shift
        if(userWaitlisted) { currentShift.isWaitlisted(true); }
    };

    EventShiftViewModel.prototype.setShiftsToReady = function (shifts) {
        shifts.forEach(function (shift) { shift.isReady(true); });
    };

    EventShiftViewModel.prototype.formatShiftData = function (shift) {
        shift.StartTime = (shift.StartTime) ? sandbox.date.parseUnix(shift.StartTime).format('h:mm A') : '';
        shift.EndTime = (shift.EndTime) ? sandbox.date.parseUnix(shift.EndTime).format('h:mm A') : '';
    };

    EventShiftViewModel.prototype.disableShifts = function (shifts) {
        var currentDate = sandbox.date.toUnix();

        return sandbox.http.get(window.env.SERVER_HOST + '/event', {
            apiKey: window.env.API_KEY,
            id: this.eventId
        })
        .then(function (event) {
            var cutoff, cutoffTime;
            if (event[0].EventCode & sandbox.constant.eventType.SERVICE) { cutoff = true; }   // cutoff only services

            shifts.forEach(function (s) {                
                cutoffTime = (cutoff) ? sandbox.date.subHours(s.StartTime, sandbox.constant.cutoffHours.SERVICE) : null; 
                if ( cutoffTime && currentDate >= cutoffTime ) {
                    s.disabled = true; 
                } else if (s.StartTime !== '0' && s.StartTime <= currentDate) { s.disabled = true; } 
                else { s.disabled = false; }
            });

            return shifts;
        });
    };

    EventShiftViewModel.prototype.getData = function (name, id) {
        var data = {
            apiKey: window.env.API_KEY
        }, url;

        switch(name) {
            case 'shifts':
                data.event = id;
                url = window.env.SERVER_HOST + '/shift';
                break;
            case 'signups':
                data.shift = id;
                url = window.env.SERVER_HOST + '/shift/signups';
                break;
            case 'waitlist':
                data.shift = id;
                url = window.env.SERVER_HOST + '/waitlist';
                break;
        }

        return sandbox.http.get(url, data);
    };

    EventShiftViewModel.prototype.setActionSubscriptions = function (shift) {
        var currentShift = sandbox.util.find(this.shifts(), function (s) { return s.Id === shift.Id; });

        sandbox.msg.subscribe(shift.Id + '.shift.add', function (updatedSignups) {
            var updated = {};
            updated[shift.Id] = updatedSignups;
            this.signups(sandbox.util.assign(this.signups, updated));
            currentShift.isSignedUp(true);
        }, this);

        sandbox.msg.subscribe(shift.Id + '.shift.waitlist.add', function (updatedWaitlist) {
            var updated = {};
            updated[shift.Id] = updatedWaitlist;
            this.waitlist(sandbox.util.assign(this.waitlist, updated));
            currentShift.isWaitlisted(true);
        }, this);

        sandbox.msg.subscribe(shift.Id + '.shift.waitlist.remove', function (updatedWaitlist) {
            var updated = {};
            updated[shift.Id] = updatedWaitlist;
            this.waitlist(sandbox.util.assign(this.waitlist, updated));
            currentShift.isWaitlisted(false);
        }, this);

        sandbox.msg.subscribe(shift.Id + '.shift.remove', function (updatedSignups) {
            var updated = {};
            updated[shift.Id] = updatedSignups;
            this.signups(sandbox.util.assign(this.signups, updated));
            currentShift.isSignedUp(false);
            
            if(!this.waitlist()[shift.Id].length) { currentShift.isFull(false); }
            this.getWaitlists([shift]);
            
        }, this);
    };

    EventShiftViewModel.prototype.setShiftObservables = function (shift) {
        shift.isFull = ko.observable(false);
        shift.isSignedUp = ko.observable(false);
        shift.isWaitlisted = ko.observable(false);
        shift.isReady = ko.observable(false);

        shift.canSignUp = ko.computed(function () {
            return !shift.isSignedUp() && !shift.isFull() && (shift.OpenTo & this.currentUser.Position);
        }, this);

        shift.canWaitlist = ko.computed(function () {
            return !shift.isSignedUp() && shift.isFull() && !shift.isWaitlisted() && (shift.OpenTo & this.currentUser.Position);
        }, this);
    };

    return EventShiftViewModel;
});