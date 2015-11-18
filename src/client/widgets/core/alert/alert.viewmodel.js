'use strict';

import sandbox from 'sandbox';
import BaseWidgetViewModel from 'base-widget.viewmodel';
import 'k/kendo.notification.min';

var msg = sandbox.msg;

class AlertViewModel extends BaseWidgetViewModel {
  constructor(options) {
    super(options);

    this.options = options || {};
  }
  
  init() {
    this.setOptions();
    this.$selector.kendoNotification(this.options);
    this.widget = this.$selector.data("kendoNotification");
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
    
    // error
    if (this.options.subscribe && this.options.subscribe.error) {
        _topic = this.options.subscribe.error;

        // create new subscriptions
        _subscription = msg.subscribe(_topic, (val) => {
            this.widget.error(val);
        }, this, true);

        // track subscriptions
        this.subscriptions.push(_subscription);
    }

    // success
    if (this.options.subscribe && this.options.subscribe.success) {
        _topic = this.options.subscribe.success;

        // create new subscriptions
        _subscription = msg.subscribe(_topic, (val) => {
            this.widget.success(val);
        }, this, true);

        // track subscriptions
        this.subscriptions.push(_subscription);
    }

    // info
    if (this.options.subscribe && this.options.subscribe.info) {
        _topic = this.options.subscribe.info;

        // create new subscriptions
        _subscription = msg.subscribe(_topic, (val) => {
            this.widget.info(val);
        }, this, true);

        // track subscriptions
        this.subscriptions.push(_subscription);
    }

    // warning
    if (this.options.subscribe && this.options.subscribe.warning) {
        _topic = this.options.subscribe.warning;

        // create new subscriptions
        _subscription = msg.subscribe(_topic, (val) => {
            this.widget.warning(val);
        }, this, true);

        // track subscriptions
        this.subscriptions.push(_subscription);
    }

  }
}

export default AlertViewModel;
