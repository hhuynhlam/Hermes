'use strict';

import $ from 'jquery';
import sandbox from 'sandbox';

var http = sandbox.http;

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
                
                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', data[0].photoName);

                $('#MainImage').attr('src', '/photos?filePath=' + data[0].filePath + '&extent=true&height=' + (window.innerWidth));
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