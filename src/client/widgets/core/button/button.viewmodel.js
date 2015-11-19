'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import BaseWidgetViewModel from 'base-widget.viewmodel';

var _ = sandbox.util;

class ButtonViewModel extends BaseWidgetViewModel {
    constructor(options) {
        super(options);

        this.options = options || {};
        
        this.status = ko.observable('');
        this.btnLabel = ko.observable('');
        this.cssClasses = ko.computed(() => {
            var _classes = {};
            
            switch (this.status()) {
                case 'disabled':
                    _classes.disabled = true;
                    break;
                case 'spinning':
                    _classes.spinning = true;
                    _classes.disabled = true;
                    break;
                default:
                    this.$selector.find('button').attr('disabled', false);
                    _classes.disabled = false;
                    _classes.spinning = false;
            }

            return _classes;
        });
    }

    init() {
        this.setOptions();
        this.setupEvents();
        this.setupPublications();
        this.setupSubscriptions();
    }

    setOptions() {
        var _label = this.options.label,
            _attr = this.options.attributes,
            _styles = this.options.styles;

        if (_label) {
            this.btnLabel(_label);
        }
        
        if ( _attr && _.isArray(_attr) ) {
            _attr.forEach((a) => {
                this.$selector.find('button').attr(a);
            });
        }

        if ( _styles && _.isArray(_styles) ) {
            _styles.forEach((c) => {
                this.$selector.find('button').addClass(c);
            });
        }
    }

    setupEvents() {
        var $document = $(document);
        if (this.options.trigger)  {
            _.forOwn(this.options.trigger, (val, key) => {
                if ( val &&_.isArray(val) ) {                    

                    // on event key
                    this.$selector.find('button').on(key, () => {

                        // trigger each event defined
                        val.forEach((v) => { $document.trigger(v); });
                    });

                }
            });
        }
    }

    setupPublications() {
        if (this.options.publish)  {
            
            this.status.subscribe(val => {
                
                if (typeof this.options.publish === 'function') {
                    this.options.publish(val);
                } else {
                    this.options.publish.forEach(function (topic) {
                        sandbox.msg.publish(topic, val);
                    }, this);
                }

            });
        
        }
    }

    setupSubscriptions() {
        if (this.options.subscribe)  {
            
            this.options.subscribe.forEach(topic => {
                
                sandbox.msg.subscribe(topic, function (val) {
                    this.status(val);
                }, this, true);
            
            });
        
        }
    }
}


export default ButtonViewModel;
