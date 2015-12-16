'use strict';

// import $ from 'jquery';
// import ko from 'knockout';
import sandbox from 'sandbox';
import BaseWidgetViewModel from 'base-widget.viewmodel';
import ConfirmWindowTemplate from 'widgets/confirmWindow/confirmWindow.html!text';

import windowWidget from 'window.widget';

var _ = sandbox.util;
var msg = sandbox.msg;

class ConfirmWindowViewModel extends BaseWidgetViewModel {
    constructor(options) {
        super(options);

        this.options = options || {};
    }   

    // @TODO: Use button widgets instead of creating custom ones 
    init() {
        var _template = _.template(ConfirmWindowTemplate);
        
        // hydrate template
        this.html = _template({ 
            html: this.options.html,

            confirmLabel: _.get(this.options, 'confirm.label') || 'Yes',
            confirmStyles: _.get(this.options, 'confirm.styles'),

            cancelLabel: _.get(this.options, 'cancel.label') || 'No',
            cancelStyles: _.get(this.options, 'cancel.styles')
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
        var _vm = this,
            _actions = ['cancel', 'confirm'];

        _actions.forEach((action) => {
            if (_vm.options[action] && _vm.options[action].callback)  {
                _vm.$selector.find('button.' + action).on('click', function (e) {
                    _vm.options[action].callback.call(this, e);
                });
            } else {
                _vm.$selector.find('button.' +  action).on('click', function () {
                    msg.publish(_vm.options.id + '.Modal.Close');
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