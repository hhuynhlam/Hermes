'use strict';

import $ from 'jquery';
// import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import windowWidget from 'window.widget';

// var http = sandbox.http;
var msg = sandbox.msg;

class AlbumViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init(albumId) {
        this.albumId = albumId;
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {

        buttonWidget.create({
            id: 'TestButton',
            label: 'Open',
            styles: [
                'btn-primary',
                'btn-block'
            ],
            trigger: {
                click: ['TestButton.Click']
            }
        });

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        windowWidget.create({
            id: 'PhotoViewer',
            content: '/#/v/photos/viewer/606',
            iframe: true,
            height: windowHeight - 100,
            width: windowWidth - 200,
            modal: true,
            visible: false,
            subscribe: {
                open: 'PhotoViewer.Open',
                close: 'PhotoViewer.Close',
                center: 'PhotoViewer.Center'
            }
        });
    }

    _setupEvents() {
        var $eventElement = $(document);
        $eventElement.on('TestButton.Click', () => {
            msg.publish('PhotoViewer.Center');
            msg.publish('PhotoViewer.Open');
        });
    }
}

export default AlbumViewModel;