'use strict';

import $ from 'jquery';
import ko from 'knockout';
// import sandbox from 'sandbox';
import buttonWidget from 'button.widget';

class AddAlbumViewModel {
    constructor(options) {
        this.options = options || {};
        this.step = ko.observable(1);
    }   

    init() {      
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {

        // ----------------------------------------
        // Buttons
        
        buttonWidget.create({
            id: 'AddAlbumPrev',
            label: 'Back',
            styles: [
                'btn-default',
                'btn-block'
            ],
            trigger: {
                click: ['AddAlbumPrev.Click']
            }
        });

        buttonWidget.create({
            id: 'AddAlbumNext',
            label: 'Next',
            styles: [
                'btn-primary',
                'btn-block',
            ],
            trigger: {
                click: ['AddAlbumNext.Click']
            }
        });

        buttonWidget.create({
            id: 'AddAlbumDone',
            label: 'Done',
            styles: [
                'btn-primary',
                'btn-block',
            ],
            trigger: {
                click: ['AddAlbumDone.Click']
            }
        });

        // ----------------------------------------
    }

    _setupEvents() {
        var $eventElement = $(document);

        $eventElement.on('AddAlbumPrev.Click', () => {
            this.step( this.step() - 1  );
        });

        $eventElement.on('AddAlbumNext.Click', () => {
            this.step( this.step() + 1  );
        });
    }
}

export default AddAlbumViewModel;