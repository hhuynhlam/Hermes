'use strict';

define(function (require) {
    var $ = require('jquery');
    require('k/kendo.notification.min');

    var notification = {
        error: function (id, msg) {
            var $selector, $notification;

            // append new notification to body
            $('#AppAlerts').append('<span id="' + id  + '"></span>');

            $selector = $('#' + id);
            $notification = $selector.kendoNotification({
                appendTo: '#AppAlerts'
            }).data('kendoNotification');

            $notification.error(msg);
        }
    };

    return notification;
});