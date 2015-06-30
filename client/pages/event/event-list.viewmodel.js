'use strict';

define(function (require) {
    var _LIMIT = 50;
	var ko = require('knockout');
    var multiSelect = require('multi-select');
	var sandbox = require('sandbox');

	var EventListViewModel = function () {
        this.eventCode = ko.observable();
		this.events = ko.observableArray([]);
        this.isMore = ko.observable(true);
        this.loadOffset = ko.observable(_LIMIT);

        this.eventView = ko.observable('upcoming');
        this.eventView.subscribe(function () { 
            this.loadOffset(_LIMIT);
            this.isMore(true); 
        }, this);
		
		this.formattedEvents = ko.computed(function () {
			var result = [];
			this.events().forEach(function (e) {
				e.Date = (e.Date) ? sandbox.date.parseUnix(e.Date).format('MM/DD/YYYY') : '';
				result.push(e);
			});
			return result;
		}, this);

		// init events
		this.getEvents({
			limit: _LIMIT
		})
		.then(function (events) {
			this.events(events);
            this.setupFilter();
		}.bind(this))
		.catch(function (err) {
			console.error('Error: Cannot get events (', err, ')');
		})
		.done();
	};

	EventListViewModel.prototype.getEvents = function (options) {
		var data, url, endDate;
		options = options || {};
        
        endDate = (options.endDate) ? sandbox.date.toUnix(options.endDate) : undefined;

        url = window.env.SERVER_HOST + '/event';
        data = {
        	apiKey: window.env.API_KEY,
        	event_code: options.type,
        	limit: options.limit,
        	offset: options.offset,
        	startDate: (this.eventView() === 'past') ? sandbox.date.toUnix('01/01/1970') : sandbox.date.toUnix(options.startDate),
        	endDate: (this.eventView() === 'past') ? sandbox.date.toUnix() : endDate
        };

        return sandbox.http.get(url, data);
	};

    EventListViewModel.prototype.seeMore = function () {
        if(!this.isMore()) { return; }

        this.getEvents({
            limit: _LIMIT,
            offset: this.loadOffset(),
            type: (this.eventCode()) ? this.eventCode() : undefined
        })
        .then(function (events) {
            if(events.length) {
                this.loadOffset(this.loadOffset() + _LIMIT);
                events.forEach(function (e) { this.events.push(e); }, this);
            } else {
                this.isMore(false);
            }
        }.bind(this))
        .catch(function (err) {
            console.error('Error: Cannot get more events (', err, ')');
        })
        .done();
    };

    EventListViewModel.prototype.seePastEvents = function () { 
        this.eventView('past'); 

        this.getEvents({
            limit: _LIMIT,
            type: (this.eventCode()) ? this.eventCode() : undefined
        })
        .then(function (events) {
            this.events(events);
        }.bind(this))
        .catch(function (err) {
            console.error('Error: Cannot get past events (', err, ')');
        })
        .done();
    };

    EventListViewModel.prototype.seeUpcomingEvents = function () { 
        this.eventView('upcoming'); 

        this.getEvents({
            limit: _LIMIT,
            type: (this.eventCode()) ? this.eventCode() : undefined
        })
        .then(function (events) {
            this.events(events);
        }.bind(this))
        .catch(function (err) {
            console.error('Error: Cannot get upcoming events (', err, ')');
        })
        .done();
    };

    EventListViewModel.prototype.setupFilter = function () {
        var selector = '#FilterEvents',
            filters = [
                { name: 'Service', value: sandbox.constant.eventType.SERVICE},
                { name: 'Fellowship', value: sandbox.constant.eventType.FELLOWSHIP},
                { name: 'General Event', value: sandbox.constant.eventType.GENERAL_EVENT()},

                { name: 'Campus', value: sandbox.constant.eventType.CAMPUS},
                { name: 'Community', value: sandbox.constant.eventType.COMMUNITY},
                { name: 'Fraternity', value: sandbox.constant.eventType.FRATERNITY},
                { name: 'Fundraiser', value: sandbox.constant.eventType.FUNDRAISER},
                { name: 'Nation', value: sandbox.constant.eventType.NATION},

                { name: 'Cool', value: sandbox.constant.eventType.COOL_FELLOWSHIP},
                { name: 'Crazy', value: sandbox.constant.eventType.CRAZY_FELLOWSHIP},
                { name: 'Sexy', value: sandbox.constant.eventType.SEXY_FELLOWSHIP},

                { name: 'Interchapters', value: sandbox.constant.eventType.INTERCHAPTER()},
                { name: 'Interchapter Home', value: sandbox.constant.eventType.INTERCHAPTER_HOME},
                { name: 'Interchapter Away', value: sandbox.constant.eventType.INTERCHAPTER_AWAY}
            ];

        multiSelect({
            selector: selector,
            textField: 'name',
            valueField: 'value',
            data: filters,
            onChange: function () {
                var selected = $(selector).data('kendoMultiSelect').value(),
                    eventCode = 0;

                // calc the event code
                selected.forEach(function (code) {
                    eventCode += code;
                });

                this.eventCode(eventCode);
                this.getEvents({
                    type: (eventCode) ? eventCode : undefined,
                    limit: _LIMIT
                })
                .then(function(events){
                    this.events(events);
                    this.isMore(true); 
                }.bind(this))
                .catch(function (err) {
                    console.error('Error: Cannot filter events (', err, ')');
                })
                .done();
            }.bind(this)
        });
    };

	return EventListViewModel;
});