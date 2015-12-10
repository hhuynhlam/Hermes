'use strict';

import $ from 'jquery';
// import ko from 'knockout';
import sandbox from 'sandbox';
import windowWidget from 'window.widget';

var http = sandbox.http;
var msg = sandbox.msg;

class AlbumViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init(albumId) {
        this.albumId = albumId;
        this.$photoGrid = $('#PhotoGrid');
        
        this._createWidgets();
        this._setupEvents();
        
        this._getPhotos();
    }

    _getPhotos() {
        var _height;

        // responsive photo grid
        if (window.innerWidth >= 1200) { _height = 218; }
        else if (window.innerWidth >= 992) { _height = 178; }
        else if (window.innerWidth >= 768) { _height = 230; }
        else { _height = window.innerWidth - 40; }

        // @TODO: Maybe this should be a DataSource
        http.post('/photos/album/' + this.albumId)
        .then((data) => {
            data.forEach((photo) => {
                
                // append image to grid
                this.$photoGrid.append('<div class="library-item" onclick="$(document).trigger(\'PhotoViewer.Init\', \'' + photo.pid + '\')"> \
                    <img src="/photos?filePath=' + photo.filePath + '&height=' + _height + '" /></div>');
            });
        })
        .catch(() => {
            console.error('Image Retrieval Error - Please try again later.');
        })
        .done();  

    }

    _createWidgets() {

        windowWidget.create({
            id: 'PhotoViewer',
            height: window.innerHeight - 100,
            width: window.innerWidth - 100,
            modal: true,
            visible: false,
            subscribe: {
                iframe: 'PhotoViewer.Iframe',
                open: 'PhotoViewer.Open',
                close: 'PhotoViewer.Close',
                center: 'PhotoViewer.Center'
            }
        });
    }

    _setupEvents() {
        var $eventElement = $(document);
        $eventElement.on('PhotoViewer.Init', (event, photoId) => {
            msg.publish('PhotoViewer.Iframe', '/#/v/photos/viewer/' + photoId);
            msg.publish('PhotoViewer.Center');
            msg.publish('PhotoViewer.Open');
        });
    }
}

export default AlbumViewModel;