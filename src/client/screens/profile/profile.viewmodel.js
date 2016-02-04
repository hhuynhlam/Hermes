'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import alertWidget from 'alert.widget';
import buttonWidget from 'button.widget';
import dropdownWidget from 'dropdown.widget';
import photoGridWidget from 'photogrid.widget';
import windowWidget from 'window.widget';

var auth = sandbox.auth;
var cookie = sandbox.cookie;
var http = sandbox.http;
var msg = sandbox.msg;

class ProfileViewModel {
    constructor(options) {
        this.options = options || {};

        this.currentUser = sandbox.auth.getCurrentUser();
        this.firstName = ko.observable('');
        this.lastName = ko.observable('');
        this.streetAddress = ko.observable('');
        this.city = ko.observable('');
        this.state = ko.observable('CA');
        this.country = ko.observable('US');
        this.zip = ko.observable('');
        this.primaryNumber = ko.observable('');
        this.secondaryNumber = ko.observable('');
        this.email = ko.observable('');
        this.password = ko.observable('');
        this.confirmPassword = ko.observable('');

        // profile image
        this.pid = ko.observable(null);
        this.photoPath = ko.observable('');
    }

    init() {
        this._setCurrentUser();
        this._createWidgets();
        this.setupEvents();
        this.setupSubscriptions();
    }

    validate() {
        if ( this.password() ) {
            if ( !this.confirmPassword() ) {
                msg.publish('Profile.Warning', 'Please confirm your new password.');
            } else if ( this.password() !== this.confirmPassword() ) {
                msg.publish('Profile.Warning', 'Passwords do not match.');
                this.password('');
                this.confirmPassword('');
            } else {
                this.save();
            }
        } else {
            this.save();
        }
    }

    save() {
        msg.publish('Profile.Save', 'spinning');

        http.put('/users/' + this.currentUser.uid, {
            pid: this.pid(),
            firstName: this.firstName(),
            lastName: this.lastName(),
            streetAddress: this.streetAddress(),
            city: this.city(),
            country: this.country(),
            state: this.state(),
            zip: this.zip(),
            primaryNumber: this.primaryNumber(),
            secondaryNumber: this.secondaryNumber(),
            email: (this.email()) ? this.email() : undefined,
            password: (this.password()) ? this.password() : undefined
        })
        .then((data) => {
            cookie.set('_user', data[0][0]);
            msg.trigger('#Navbar', 'App.CurrentUser', data[0][0]);
            msg.publish('Profile.Success', 'Saved Successful!');
        })
        .catch(() => {
            msg.publish('Profile.Error', 'Save Unsuccessful - Please try again later.');
        })
        .fin(() => { msg.publish('Profile.Save', 'enabled'); })
        .done();
    }

    setupEvents() {
        var _vm = this,
            $eventElement = $(document);

        $eventElement.on('PhotoImageViewer.Choose', (e, target) => {
            var _pid = target.dataset.pid,
                _path = target.dataset.path;

            _vm.pid(_pid);
            _vm.photoPath(_path);

            msg.publish('PhotoImageContainer.close');
        });
    }

    setupSubscriptions() {
        msg.subscribe('Profile.Country', (country) => {
            this.country(country);
        });

        msg.subscribe('Profile.State', (state) => {
            this.state(state);
        });
    }

    _setCurrentUser() {
        if (this.currentUser) {
            this.pid(this.currentUser.pid);
            this.photoPath('/photos?filePath=' + this.currentUser.filePath + '&thumb=true&width=200');
            this.firstName(this.currentUser.firstName);
            this.lastName(this.currentUser.lastName);
            this.streetAddress(this.currentUser.streetAddress);
            this.city(this.currentUser.city);
            this.state(this.currentUser.state || 'CA');
            this.country(this.currentUser.country || 'US');
            this.zip(this.currentUser.zip);
            this.primaryNumber(this.currentUser.primaryNumber);
            this.secondaryNumber(this.currentUser.secondaryNumber);
            this.email(this.currentUser.email);
        }
    }

    _createWidgets() {
        var _vm = this;

        alertWidget.create({
            id: 'ProfileAlert',
            position: {
                top: 60,
                right: 10
            },
            subscribe: {
                error: 'Profile.Error',
                success: 'Profile.Success',
                info: 'Profile.Info',
                warning: 'Profile.Warning'
            }
        });

        buttonWidget.create({
            id: 'PhotoImageButton',
            label: '<span class="glyphicon glyphicon-pencil"></span>',
            styles: [
                'btn-circle',
                'btn-info'
            ],
            trigger: {
                click: ['PhotoImageButton.Click']
            }
        });

        buttonWidget.create({
            id: 'SaveButton',
            label: 'Save',
            attributes: [{
                type: 'submit'
            }],
            styles: [
                'btn-primary',
                'btn-block'
            ],
            subscribe: ['Profile.Save']
        });

        dropdownWidget.create({
            id: 'CountryDropdown',
            change: ['Profile.Country'],
            dataTextField: 'name',
            dataValueField: 'code',
            dataSource: {
                transport: {
                    read: '/countries'
                }
            },
            value: this.country()
        });

        dropdownWidget.create({
            id: 'StateDropdown',
            cascadeFrom: 'CountryDropdown',
            change: ['Profile.State'],
            dataTextField: 'name',
            dataValueField: 'short',
            dataSource: {
                transport: {
                    read: '/states'
                }
            },
            value: this.state()
        });

        photoGridWidget.create({
            id: 'PhotoImageViewer',
            styles: ['profile-image-chooser'],
            dataSource: {
                transport: {
                    read: {
                        type: 'POST',
                        url: '/users/photos/' +  auth.getCurrentUser().uid
                    }
                }
            },
            dataBound: function ($photoGrid, data) {
                var _grid = '';

                // no further action if no photos
                if (!data || !data[0] || !data[0].pid) { return; }

                data.forEach((photo) => {
                    _grid += '<div class="library-item" \
                        data-pid="' + photo.pid + ' "data-path="/photos?filePath=' + photo.filePath + '&thumb=true&width=200" \
                        onclick="$(document).trigger(\'PhotoImageViewer.Choose\', this)"> \
                        <img src="/photos?filePath=' + photo.filePath + '&thumb=true&width=' + this.getResponsiveWidth() + '" /></div>';
                });

                // append image to grid
                $photoGrid.append(_grid);

                // set photo grid reference
                _vm.$photoGrid = $photoGrid;
            }
        });

        windowWidget.create({
            id: 'PhotoImageContainer',
            modal: true,
            visible: false,
            height: window.innerHeight - 100,
            width: window.innerWidth - 100,
            styles: ['uly-photoGrid'],

            subscribe: {
                html: 'PhotoImageContainer.html',
                open: 'PhotoImageContainer.open',
                close: 'PhotoImageContainer.close',
                center: 'PhotoImageContainer.center'
            }
        });
    }

    // dev
    initChoosePhoto() {
        msg.publish('PhotoImageContainer.html', this.$photoGrid.html());
        msg.publish('PhotoImageContainer.center');
        msg.publish('PhotoImageContainer.open');
    }
}

export default ProfileViewModel;
