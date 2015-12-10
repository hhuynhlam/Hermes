'use strict';

import $ from 'jquery';
import sandbox from 'sandbox';

var http = sandbox.http;

class LibraryViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init() {
        this.$albumGrid = $('#LibraryGrid');
        
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
        http.get('/photos/albums')
        .then((data) => {
            data.forEach((album) => {
                // append image to grid
                this.$albumGrid.append('<div class="library-item"> \
                    <a href="/#/photos/album/' + album.pgid + '"> \
                    <img src="/photos?filePath=' + album.filePath + '&height=' + _height + '" /> \
                    <p class="text-center">' + album.groupName + '</p> \
                    </a></div>');
            });
        })
        .catch(() => {
            console.error('Image Retrieval Error - Please try again later.');
        })
        .done();  

    }

    _createWidgets() {

    }

    _setupEvents() {

    }
}

export default LibraryViewModel;