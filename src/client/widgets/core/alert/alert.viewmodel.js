'use strict';

import sandbox from 'sandbox';
import BaseWidgetViewModel from 'base-widget.viewmodel';
import 'k/kendo.notification.min';

var msg = sandbox.msg;
var _ = sandbox.util;

class AlertViewModel extends BaseWidgetViewModel {
    constructor(options) {
        super(options);

        this.options = options || {};
    }
    
    init() {
        this.setOptions();
        this.$selector.kendoNotification(this.options);
    }
    
    setOptions() {
        var _supportedEvents = ['hide', 'show'];
        this.setupPublications(_supportedEvents);
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        var _subscription, _topic;

        // dispose any existing subscriptions
        msg.dispose.apply(this, this.subscriptions);
        
        // supported subscriptions: error, success, info, warning
        if (this.options.subscribe) {
            _.forOwn(this.options.subscribe, (val, key) => {
                _topic = val;

                // create new subscriptions
                _subscription = msg.subscribe(_topic, (val) => {
                    this.$selector.data("kendoNotification")[key](val);
                }, this, true);

                // track subscriptions
                this.subscriptions.push(_subscription);
            });

        }
    }
}

export default AlertViewModel;
