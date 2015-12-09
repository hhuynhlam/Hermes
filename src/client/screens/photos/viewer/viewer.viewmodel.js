'use strict';

import $ from 'jquery';
// import ko from 'knockout';
import sandbox from 'sandbox';
// import imagesLoaded from 'imagesloaded';

var http = sandbox.http;
// var msg = sandbox.msg;

class ViewerViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init(photoId) {
        this.photoId = photoId;
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
        http.post( '/photos/' + this.photoId )
        .then((data) => {
            if (data && data.length) {
                $('#MainImage').attr('src', '/photos?filePath=' + data[0].filePath );
            } else {
                console.error('Image Retrieval Error - Photo Not Found.');
            }
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

export default ViewerViewModel;