'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import photoGridWidget from 'photogrid.widget';

var _ = sandbox.util;
var http = sandbox.http;
var msg = sandbox.msg;
var promise = sandbox.promise;

// Test
import 'k/kendo.upload.min';

class AddAlbumViewModel {
    constructor(options) {
        this.options = options || {};
        this.step = ko.observable(1);

        this.albumId = ko.observable();
        this.albumName = ko.observable('');

        this.uploadedPhotos = ko.observableArray([]);
    }   

    init() {      
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
        var _vm = this;
        
    // ----------------------------------------
    // Buttons
        
        buttonWidget.create({
            id: 'AddAlbumCreate',
            label: '+ Create Album',
            styles: [
                'btn-primary',
                'btn-block'
            ],
            subscribe: ['AddAlbumCreate.Button'],
            trigger: {
                click: ['AddAlbumCreate.Click']
            }
        });

        buttonWidget.create({
            id: 'AddAlbumNext',
            label: 'Next',
            attributes: [{
                disabled: true
            }],
            styles: [
                'btn-primary',
                'btn-block',
                'disabled'
            ],
            subscribe: ['AddAlbumNext.Button'],
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
            subscribe: ['AddAlbumDone.Button'],
            trigger: {
                click: ['AddAlbumDone.Click']
            }
        });

    // ----------------------------------------
    
    // ----------------------------------------
    // PhotGrid
    
        photoGridWidget.create({
            id: 'AddAlbumPhotoGrid',
            dataSource: this.uploadedPhotos,
            dataBound: function ($photoGrid, data) {
                var _album = '';
                
                data.forEach((photo) => {
                    _album += '<div class="library-item"> \
                        <img src="/photos?filePath=' + photo.path + '&height=' + this.getResponsiveHeight() + '" /> \
                        <input data-id="' + photo.pid + '" type="text" placeholder="Caption" class="form-control add-album-caption" style="margin-top: 5px;">\
                        </div>';
                });

                // append image to grid
                $photoGrid.html(_album);
            }           
        });

    // ----------------------------------------
    
    // ----------------------------------------
    // Upload
        
        $('#AddAlbumUpload').kendoUpload({
            async: {
                saveUrl: '/photos/upload'
            },
            localization: {
                dropFilesHere: "Drag & Drop Files Here to Upload"
            },
            success: (e) => {
                msg.publish('AddAlbumNext.Button', 'enable');
                _vm.uploadedPhotos.push( {
                    pid: e.response.pid,
                    path: e.response.path,
                    caption: ''
                });
            },
            upload: (e) => {
                e.data = { pgid: _vm.albumId() };
            }
        });

    // ---------------------------------------- 
    
    }

    _setupEvents() {
        var $eventElement = $(document);

        $eventElement.on('AddAlbumCreate.Click', () => {

            // @TODO: Add validation, so we don't get a blank album name
            // 
            
            msg.publish('AddAlbumCreate.Button', 'spinning');

            // create new album
            http.put('/photos/albums', { groupName: this.albumName() })
            .then((data) => {
                msg.publish('AddAlbumCreate.Button', 'enable');
                this.albumId(data[0][0].pgid);
                this.step( this.step() + 1  );
            })
            .catch((err) => {
                console.error('Error: Could not create new album ( ', err, ')');
            })
            .done();
        });

        $eventElement.on('AddAlbumNext.Click', () => {
            this.step( this.step() + 1  );
        });

        $eventElement.on('AddAlbumDone.Click', () => {
            var _captions = $('.add-album-caption'),
                _promises = [];

            msg.publish('AddAlbumDone.Button', 'spinning');

            _.forEach(_captions, (c) => {
                _promises.push( http.put('/photos/update/' + c.dataset.id, {
                    photoName: c.value
                }));
            });

            promise.all(_promises)
            .fin(() => {
                msg.publish('AddAlbumDone.Button', 'enable');
            });
        });
    }
}

export default AddAlbumViewModel;

