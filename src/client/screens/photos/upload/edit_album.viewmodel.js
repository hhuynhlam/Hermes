'use strict';

// import $ from 'jquery';
// import ko from 'knockout';
// import sandbox from 'sandbox';

// var msg = sandbox.msg;

class EditAlbumViewModel {
    constructor(options) {
        this.options = options || {};
    }   

    init(albumId) {
        this.albumId = albumId;        
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
      
    }

    _setupEvents() {
        
    }
}

export default EditAlbumViewModel;