'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import imagesLoaded from 'imagesloaded';

var _ = sandbox.util;
var http = sandbox.http;
var msg = sandbox.msg;

class PhotoGridViewModel {
    constructor(options) {
        this.options = options || {};
        this.subscriptions = [];
    }   

    init() {
        sandbox.app.isLoading(true);

        this.$grid = $('#' + this.options.id);
        this._setupSubscriptions();
        this._getPhotos();
    }

    getResponsiveWidth() {
        if (window.innerWidth >= 1200) { return 218; }
        else if (window.innerWidth >= 992) { return 178; }
        else if (window.innerWidth >= 768) { return 230; }
        else { return window.innerWidth - 40; }
    }

    refresh() {
        sandbox.app.isLoading(true);
        this.$grid.html('');
        this._getPhotos();
    }

    _getPhotos() {
        var _vm = this,
            _method = _.get(_vm.options, 'dataSource.transport.read.type'),
            _url = _.get(_vm.options, 'dataSource.transport.read.url');
        
        if (_method && _url) {
            _method = _method.toLowerCase();
            
            // @TODO: Maybe this should be a DataSource
            http[_method](_url)
            .then((data) => {
                _vm.options.dataBound.call(_vm, _vm.$grid, data);

                imagesLoaded('#' + _vm.options.id + '>div:nth-child(-n+15)', () => {
                    sandbox.app.isLoading(false);
                });
            })
            .catch((err) => {
                console.error('Image Retrieval Error - Please try again later (', err, ')');
            })
            .done();  
        
        } else {
            _vm.data = ko.computed(() => {
                _vm.options.dataBound.call(_vm, _vm.$grid, _vm.options.dataSource());
            });

            sandbox.app.isLoading(false);
        }

    }

    _setupSubscriptions() {
        if (this.options.subscribe) {
            var _subscription;

            // dispose any existing subscriptions
            msg.dispose.apply(this, this.subscriptions);
            
            // refresh
            if (this.options.subscribe.refresh) {
                _subscription = msg.subscribe(this.options.subscribe.refresh, () => {
                    this.refresh();
                }, this, true);

                this.subscriptions.push(_subscription);
            }
        }
    }
}

export default PhotoGridViewModel;