'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';

var _date = sandbox.date;
var http = sandbox.http;

class ViewerViewModel {
    constructor(options) {
        this.options = options || {};
        this.meta = ko.observable({});

        this.profileImage = ko.computed(() => {
            return '/photos?filePath=' + this.meta().profileImage + '&thumb=true&width=75';
        });

        this.comments = ko.observableArray([]);
    }   

    init(photoId) {
        this.photoId = photoId;
        this._createWidgets();
        this._setupEvents();
    }

    formatDate(date) {
        return _date(date).format('MM/DD/YYYY hh:mm A');
    }

    _createWidgets() {
        var _vm = this;

        // Main Photo
        http.post( '/photos/' + this.photoId )
        .then((data) => {
            if (data && data.length) {
                
                // hydrate photo meta
                _vm.meta(data[0]);

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

        // Comment Box Widget
        http.post( '/comments/photos/' + this.photoId )
        .then((data) => {
            this.comments(data);
        })
        .catch((err) => {
            console.error('Comments Retrieval Error. (', err, ')');
        })
        .done();
    }

    _setupEvents() {
        // var $eventElement = $(document);
    }
}

export default ViewerViewModel;