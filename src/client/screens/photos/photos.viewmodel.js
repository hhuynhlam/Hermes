'use strict';

// import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import masonryWidget from 'masonry.widget';
import windowWidget from 'window.widget';

import imagesLoaded from 'imagesloaded';

// var _ = sandbox.util;
// var http = sandbox.http;
var msg = sandbox.msg;

class PhotosViewModel {
    constructor(options) {
        this.options = options || {};
        this.emails = ko.observable('');
    }   

    init() {
        this._createWidgets();
        this._setupEvents();

        System.import('screens/photos/test.html!text').then((template) => {
            msg.publish('PhotoViewer.Html', template);

            imagesLoaded('#PhotoViewer', () => {
                msg.publish('PhotoViewer.Center');
                msg.publish('PhotoViewer.Open');
            });
        });
    }

    _createWidgets() {
        masonryWidget.create({
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

        windowWidget.create({
            id: 'PhotoViewer',
            modal: true,
            visible: false,
            subscribe: {
                html: 'PhotoViewer.Html',
                open: 'PhotoViewer.Open',
                close: 'PhotoViewer.Close',
                center: 'PhotoViewer.Center'
            }
        });
    }

    _setupEvents() {
        // var $eventElement = $(document);
    }
}

export default PhotosViewModel;