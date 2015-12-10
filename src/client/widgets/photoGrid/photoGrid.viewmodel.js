'use strict';

import $ from 'jquery';
import sandbox from 'sandbox';

var http = sandbox.http;

class PhotoGridViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init() {
        this.$grid = $('#' + this.options.id);
        this._setupEvents();
        this._getPhotos();
    }

    getResponsiveHeight() {
        if (window.innerWidth >= 1200) { return 218; }
        else if (window.innerWidth >= 992) { return 178; }
        else if (window.innerWidth >= 768) { return 230; }
        else { return window.innerWidth - 40; }
    }

    _getPhotos() {
        var _vm = this,
            _method = this.options.dataSource.transport.read.type.toLowerCase(),
            _url = this.options.dataSource.transport.read.url;

        // @TODO: Maybe this should be a DataSource
        http[_method](_url)
        .then((data) => {
            _vm.options.dataBound.call(_vm, _vm.$grid, data);
        })
        .catch((err) => {
            console.error('Image Retrieval Error - Please try again later (', err, ')');
        })
        .done();  

    }

    _setupEvents() {

    }
}

export default PhotoGridViewModel;