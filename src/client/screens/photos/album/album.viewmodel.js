'use strict';

import $ from 'jquery';
// import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import photoGridWidget from 'photogrid.widget';
import windowWidget from 'window.widget';

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
            id: 'EditAlbumButton',
            label: '<span class="glyphicon glyphicon-pencil"></span>',
            styles: [
                'btn-default'
            ],
            subscribe: ['EditAlbumButton.Button'],
            trigger: {
                click: ['EditAlbumButton.Click']
            }
        });
        
        buttonWidget.create({
            id: 'DeleteAlbumButton',
            label: '<span class="glyphicon glyphicon-ban-circle"></span>',
            styles: [
                'btn-danger'
            ],
            subscribe: ['DeleteAlbumButton.Button'],
            trigger: {
                click: ['DeleteAlbumButton.Click']
            }
        });

        photoGridWidget.create({
            id: 'PhotoGrid',
            dataSource: { 
                transport: { 
                    read: {
                        type: 'POST',
                        url: '/photos/albums/' + this.albumId  
                    }
                }
            },
            dataBound: function ($photoGrid, data) {
                var _album = '';

                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', data[0].groupName);
                
                if (!data[0].pid) { return; }

                data.forEach((photo) => {
                    _album += '<div class="library-item" \
                        onclick="$(document).trigger(\'PhotoViewer.Init\', \'' + photo.pid + '\')"> \
                        <img src="/photos?filePath=' + photo.filePath + '&thumb=true&width=' + this.getResponsiveWidth() + '" /></div>';
                });

                // append image to grid
                $photoGrid.append(_album);
            }           
        });

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