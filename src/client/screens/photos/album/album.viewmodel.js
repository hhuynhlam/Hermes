'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import confirmWidget from 'confirmWindow.widget';
import photoGridWidget from 'photogrid.widget';
import windowWidget from 'window.widget';

var auth = sandbox.auth;
var msg = sandbox.msg;
var http = sandbox.http;

class AlbumViewModel {
    constructor(options) {
        this.options = options || {};
        this.isCurrentUsersAlbum = ko.observable(false);
    }   

    init(albumId) {
        this.albumId = albumId;        
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
        var _vm = this;

        buttonWidget.create({
            id: 'EditAlbumButton',
            label: '<span class="glyphicon glyphicon-pencil"></span>',
            styles: [
                'btn-circle',
                'btn-circle-md',
                'btn-default'
            ],
            trigger: {
                click: ['EditAlbumButton.Click']
            }
        });
        
        buttonWidget.create({
            id: 'DeleteAlbumButton',
            label: '<span class="glyphicon glyphicon-trash"></span>',
            styles: [
                'btn-circle',
                'btn-circle-md',
                'btn-danger'
            ],
            trigger: {
                click: ['DeleteAlbumButton.Click']
            }
        });

        confirmWidget.create({
            id: 'ConfirmDelete',
            modal: true,
            title: false,
            visible: false,
            html: 'Are you sure you want to delete this album?',
            confirm: {
                label: 'Delete',
                styles: ['btn', 'btn-danger'],
                callback: _vm._deleteAlbum.bind(this)
            },
            cancel: {
                label: 'Cancel',
                styles: ['btn', 'btn-default']
            },
            subscribe: {
                open: 'ConfirmDelete.Open',
                close: 'ConfirmDelete.Close'
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
                
                // check if album is editable and deleteable
                _vm.isCurrentUsersAlbum( (data[0].uid === auth.getCurrentUser().uid) ? true : false );

                // no further action if no photos
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
        var _vm = this,
            $eventElement = $(document);

        // photo viewer
        $eventElement.on('PhotoViewer.Init', (event, photoId) => {
            msg.publish('PhotoViewer.Iframe', '/#/v/photos/viewer/' + photoId);
            msg.publish('PhotoViewer.Center');
            msg.publish('PhotoViewer.Open');
        });

        // edit album
        $eventElement.on('EditAlbumButton.Click', () => {
            window.location.assign('/#/photos/album/edit/' + _vm.albumId);
        });
    
        // delete album
        $eventElement.on('DeleteAlbumButton.Click', () => {
            msg.publish('ConfirmDelete.Open');
        });
    }

    _deleteAlbum () {
        http.delete('/photos/albums/' + this.albumId)
        .then(() => {
            msg.publish('ConfirmDelete.Close'); 
            window.location.replace('/#/photos'); 
        })
        .catch((err) => { console.error('Error: Could not delete album ( ', err, ')'); })
        .done();
    }
}

export default AlbumViewModel;