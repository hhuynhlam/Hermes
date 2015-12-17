'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import alertWidget from 'alert.widget';
import buttonWidget from 'button.widget';
import confirmWidget from 'confirmWindow.widget';
import photoGridWidget from 'photogrid.widget';

import editAlbumItemTemplate from 'screens/photos//upload/edit_album_item.html!text';

var _ = sandbox.util;
var http = sandbox.http;
var msg = sandbox.msg;
var promise = sandbox.promise;

class EditAlbumViewModel {
    constructor(options) {
        this.options = options || {};

        this.updatedCaptions = {};
        this.deletedPhotos = {};
        this.promises = [];

        this.imgCount = ko.observable(0);
    }   

    init(albumId) {
        this.albumId = albumId;        
        this._createWidgets();
    }
    
    save () {
        if ( _.size(this.deletedPhotos) ) { msg.publish('ConfirmDelete.Open'); } 
        else { this._save(); }
    }

    upload () {
        window.location.assign('/#/photos/album/upload/' + this.albumId);
    }

    _save () {
        var _screenVm = this;
        msg.publish('EditAlbumSave.Button', 'spinning');
        msg.publish('ConfirmDelete.Close');

        _screenVm._updateCaptions();
        _screenVm._deletePhotos();

        promise.all(_screenVm.promises)
        .then(() => {

            // cleanup
            _screenVm._cleanup();
            msg.publish('EditAlbumAlert.Success', 'Album successfully updated!');
            msg.publish('EditAlbumSave.Button', 'enabled');
        })
        .catch((err) => { 
            msg.publish('EditAlbumAlert.Error', 'Save Unsuccessful - Please try again later.');
            console.error('Error: Could not save updates to album ( ', err, ')'); 
        })
        .done();
    }

    _createWidgets() {
        var _screenVm = this;

        alertWidget.create({
            id: 'EditAlbumAlert',
            position: {
                top: 60,
                right: 10
            },
            subscribe: {
                error: 'EditAlbumAlert.Error',
                success: 'EditAlbumAlert.Success',
                info: 'EditAlbumAlert.Info',
                warning: 'EditAlbumAlert.Warning'
            }
        });

        buttonWidget.create({
            id: 'EditAlbumUpload',
            label: '<span class="glyphicon glyphicon-upload"></span> Upload',
            styles: [
                'btn-success',
                'btn-block'
            ],
            trigger: {
                click: ['EditAlbumUpload.Click']
            }
        });

        buttonWidget.create({
            id: 'EditAlbumSave',
            label: 'Save',
            styles: [
                'btn-primary',
                'btn-block'
            ],
            subscribe: ['EditAlbumSave.Button'],
            trigger: {
                click: ['EditAlbumSave.Click']
            }
        });

        confirmWidget.create({
            id: 'EditAlbumConfirmDelete',
            modal: true,
            title: false,
            visible: false,
            html: 'Are you sure you want to delete photo(s)?',
            confirm: {
                label: 'Delete',
                styles: ['btn', 'btn-danger'],
                callback: _screenVm._save.bind(this)
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
            id: 'EditAlbumPhotoGrid',
            dataSource: { 
                transport: { 
                    read: {
                        type: 'POST',
                        url: '/photos/albums/' + _screenVm.albumId  
                    }
                }
            },
            dataBound: function ($photoGrid, data) {
                var _widgetVm = this,
                    _album = '';

                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', 'Editing: "' + data[0].groupName + '"');

                // no further action if no photos
                if (!data[0].pid) { return; }

                data.forEach((photo) => {
                    var _template = _.template(editAlbumItemTemplate);
                    _album += _template({
                        pid: photo.pid,
                        filePath: photo.filePath,
                        photoName: photo.photoName,
                        width: _widgetVm.getResponsiveWidth()
                    });
                });

                // update img count
                _screenVm.imgCount(data.length);

                // append image to grid
                $photoGrid.append(_album);

                // setup events
                _screenVm._setupEvents();
            }           
        });
    }

    _setupEvents() {
        var _screenVm = this;

        // delete photo event
        $('.edit-album-delete').on('click', (e) => {
            var _libraryItem = _.get(e.currentTarget, 'parentElement.parentElement'),
                _photoId = _.get(e.currentTarget, 'dataset.id'),
                _caption;

            // set item jQuery selector
            _libraryItem = $(_libraryItem);
            _caption = _libraryItem.find('.edit-album-caption');

            // check for item and pid
            if (_libraryItem && _photoId) {

                // if was deleted, cancel
                if (_libraryItem.hasClass('deleted')) {
                    delete _screenVm.deletedPhotos[_photoId];
                    _caption.removeAttr('disabled');
                
                // else, mark for delete
                } else {
                    _screenVm.deletedPhotos[_photoId] = _libraryItem;
                    _caption.attr('disabled', true); 
                }

                // toggle delete class
                _libraryItem.toggleClass('deleted');
            }
        });

        // update comment event
        $('.edit-album-caption').on('change', (e) => {
            var _targetId = _.get(e.currentTarget, 'dataset.id'),
                _targetCaption = e.currentTarget.value;

            if (_targetId && _targetId) { _screenVm.updatedCaptions[_targetId] = _targetCaption; }
        });
    }

    _deletePhotos () {
        var _screenVm = this,
            _deletedPhotos = _screenVm.deletedPhotos;

        _.forOwn(_deletedPhotos, (val, key) => {
            _screenVm.promises.push( 
                http.delete('/photos/' + key)
            );
        });
    }

    _updateCaptions () {
        var _screenVm = this,
            _captions = _screenVm.updatedCaptions;

        _.forOwn(_captions, (val, key) => {
            _screenVm.promises.push( 
                http.put('/photos/update/' + key, {
                    photoName: val
                })
            );
        });
    }

    _cleanup () {

        // remove from DOM
        _.forOwn(this.deletedPhotos, (val) => {
            val.remove();
        });

        this.imgCount( this.imgCount - _.size(this.deletedPhotos) );
        this.updatedCaptions = {};
        this.deletedPhotos = {};
        this.promises = [];
    }
}

export default EditAlbumViewModel;