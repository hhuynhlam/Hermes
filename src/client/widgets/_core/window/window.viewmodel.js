'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';
import BaseWidgetViewModel from 'base-widget.viewmodel';
import 'k/kendo.window.min';

var msg = sandbox.msg;

class WindowViewModel extends BaseWidgetViewModel {
    constructor(options) {
        super(options);

        this.options = options || {};
        this.value = ko.observable();
    }
  
    init() {
        this.setOptions();
        this.$selector.kendoWindow(this.options);
    }
  
    setOptions() {
        var _supportedEvents = ['activate', 'close', 'deactivate', 'dragend', 'dragstart', 'error', 'open', 'refresh', 'resize'];
        this.$selector.html(this.options.html);
        
        this.setupPublications(_supportedEvents);
        this.setupSubscriptions(); 
    }

    setupSubscriptions() {
        if (this.options.subscribe) {
            var _subscription;

            // dispose any existing subscriptions
            msg.dispose.apply(this, this.subscriptions);
            
            // inner html subscription
            if (this.options.subscribe.html) {
                _subscription = msg.subscribe(this.options.subscribe.html, (html) => {
                    this.$selector.html(html);
                }, this, true);

                this.subscriptions.push(_subscription);
            }

            // iframe subscription
            if (this.options.subscribe.iframe) {
                _subscription = msg.subscribe(this.options.subscribe.iframe, (iframe) => {
                    this.$selector.html('<iframe src="' + iframe + '" height="' + this.options.height + '" width="' + this.options.width + '"></iframe>');
                }, this, true);

                this.subscriptions.push(_subscription);
            }

            // open subscription
            if (this.options.subscribe.open) {
                _subscription = msg.subscribe(this.options.subscribe.open, () => {
                    this.$kendoWindow = this.$kendoWindow || this.$selector.data('kendoWindow');
                    this.$kendoWindow.open();
                }, this, true);

                this.subscriptions.push(_subscription);
            }

            // close subscription
            if (this.options.subscribe.close) {
                _subscription = msg.subscribe(this.options.subscribe.close, () => {
                    this.$kendoWindow = this.$kendoWindow || this.$selector.data('kendoWindow');
                    this.$kendoWindow.close();
                }, this, true);

                this.subscriptions.push(_subscription);
            }

            // close subscription
            if (this.options.subscribe.center) {
                _subscription = msg.subscribe(this.options.subscribe.center, () => {
                    this.$kendoWindow = this.$kendoWindow || this.$selector.data('kendoWindow');
                    this.$kendoWindow.center();
                }, this, true);

                this.subscriptions.push(_subscription);
            }
        }
    }
}

export default WindowViewModel;
