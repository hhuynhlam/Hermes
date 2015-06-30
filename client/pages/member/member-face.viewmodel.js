'use strict';

define(function (require) {
    var ko = require('knockout');
    var role = require('role');
    var sandbox = require('sandbox');

    var MemberFaceViewModel = function () {
        this.actives = ko.observableArray([]);
        this.excomm = ko.observableArray([]);

        // init events
        this.getMembers()
        .then(function (members) {
            this.sort(members);
        }.bind(this))
        .catch(function (err) {
            console.error('Error: Cannot get members (', err, ')');
        })
        .done();
    };

    MemberFaceViewModel.prototype.getMembers = function() {
        var data, url;

        url = window.env.SERVER_HOST + '/member/list';
        data = { 
            apiKey: window.env.API_KEY, 
            select: ['FirstName', 'LastName', 'Position', 'Class', 'Family']
        };

        return sandbox.http.get(url, data);
    };

    MemberFaceViewModel.prototype.sort = function(members) {
        members.forEach(function (m) {
            var excomm = role.isExcomm(m.Position);
            
            if(excomm) { this.excomm.push(m); }
            else if(m.Position & sandbox.constant.role.ACTIVE) { this.actives.push(m); }
        }, this);
    };

    return MemberFaceViewModel;
});