'use strict';

// import $ from 'jquery';
// import ko from 'knockout';
import sandbox from 'sandbox';
import BaseWidgetViewModel from 'base-widget.viewmodel';

import windowWidget from 'window.widget';

import ConfirmWindowTemplate from 'widgets/confirmWindow/confirmWindow.html!text';

var _ = sandbox.util;
var msg = sandbox.msg;

class ConfirmWindowViewModel extends BaseWidgetViewModel {
    constructor(options) {
        super(options);

        this.options = options || {};
    }   

    init() {
        var _template = _.template(ConfirmWindowTemplate);
        
        this.html = _template({ 
            html: this.options.html,
            confirmLabel: this.options.confirmLabel || 'Yes',
            cancelLabel: this.options.cancelLabel || 'No'
        });
        
        this._createWidgets();
        this._setupSubscriptions();
        this._setupEvents();
    }

    _createWidgets() {
        var _options = this._overwriteOptions();
        windowWidget.create(_options);
    }

    _setupSubscriptions() {
        var _subscription;

        // dispose any existing subscriptions
        msg.dispose.apply(this, this.subscriptions);

        // open subscription
        if (this.options.subscribe.open) {
            _subscription = msg.subscribe(this.options.subscribe.open, () => {
                msg.publish(this.options.id + '.Modal.Center');
                msg.publish(this.options.id + '.Modal.Open');
            }, this, true);

            this.subscriptions.push(_subscription);
        }

        // close subscription
        if (this.options.subscribe.close) {
            _subscription = msg.subscribe(this.options.subscribe.close, () => {
                msg.publish(this.options.id + '.Modal.Close');
            }, this, true);

            this.subscriptions.push(_subscription);
        }
    }

    _setupEvents() {
        var _actions = ['cancel', 'confirm'];

        _actions.forEach((action) => {
            if (this.options[action])  {
                this.$selector.find('button.' + action).on('click', (e) => {
                    this.options[action].call(this, e);
                });
            } else {
                this.$selector.find('button.' +  action).on('click', function () {
                    msg.publish(this.options.id + '.Modal.Close');
                });
            }
        });
    }

    _overwriteOptions() {

        // copy by value
        var _options = Object.assign({}, this.options);
        
        // overwrite
        _options.html = this.html;
        _options.subscribe = {
            open: this.options.id + '.Modal.Open',
            close: this.options.id + '.Modal.Close',
            center: this.options.id + '.Modal.Center'
        };

        return _options;
    }
}

export default ConfirmWindowViewModel;