'use strict';

import $ from 'jquery';
import sandbox from 'sandbox';

var http = sandbox.http;

class LibraryViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init() {
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {


        http.post( '/photos')
        .then((data) => {
            data.forEach((photo) => {
                
                // append album to grid
                $('#LibraryGrid').append('<div class="library-item"> \
                    <img src="/photos?filePath=' + photo.filePath + '&height=200" /></div>');
            });
        })
        .catch(() => {
            console.error('Image Retrieval Error - Please try again later.');
        })
        .done();  
    }

    _setupEvents() {
        // var $eventElement = $(document);
    }
}

export default LibraryViewModel;