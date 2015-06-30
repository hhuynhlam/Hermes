'use strict';

define(function (require) {
    var moment = require('moment');

    var date = {
        getDate: function (date) { return moment(date); },
        getStartEndOfMonth: function(month, year) { 
            if(!year) { year = moment().get('year'); } 
            var startDate = moment([year, month - 1]),
                endDate = moment(startDate).endOf('month');
            return { start: startDate, end: endDate };
        },

        parseUnix: moment.unix,
        
        subHours: function (date, hours) { return moment.unix(date).subtract(hours, 'hour').unix(); },
        toUnix: function (date) { return (date) ? moment(new Date(date)).unix() : moment(Date.now()).unix(); }
    };

    return date;
});