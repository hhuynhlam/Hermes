'use strict';

// import $ from 'jquery';
import ko from 'knockout';
// import sandbox from 'sandbox';

import masonryWidget from 'masonry.widget';

// var _ = sandbox.util;
// var http = sandbox.http;
// var msg = sandbox.msg;

class PhotosViewModel {
    constructor(options) {
        this.options = options || {};
        this.emails = ko.observable('');
    }   

    init() {
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
        this.$photoMasonry = masonryWidget.create({
            id: 'PhotoMasonry',
            itemClass: 'masonry-item',
            itemSelector: '.masonry-item',
            data: {
                transport: '/photos'
            },
            columnWidth: 200,
            gutter: 5,
            isFitWidth: true
        });
    }

    _setupEvents() {
        // var $eventElement = $(document);
    }
}

export default PhotosViewModel;