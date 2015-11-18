'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';
import alertWidget from 'alert.widget';
import buttonWidget from 'button.widget';
// import dropdownWidget from 'dropdown.widget';

var cookie = sandbox.cookie;
var http = sandbox.http;
var msg = sandbox.msg;

class ProfileViewModel {
    constructor(options) {
        this.options = options || {};

        this.currentUser = sandbox.cookie.get('_user');
        this.currentUser = (this.currentUser) ? JSON.parse(this.currentUser) : null;

        this.firstName = ko.observable('');
        this.lastName = ko.observable('');
        this.streetAddress = ko.observable('');
        this.city = ko.observable('');
        // this.state = ko.observable('');
        // this.country = ko.observable('');
        this.zip = ko.observable('');
        this.homePhone = ko.observable('');
        this.mobilePhone = ko.observable('');
        this.email = ko.observable('');
        this.password = ko.observable('');
    }   

    init() {
        this._setCurrentUser();
        this._createWidgets();
        // this._createDropdowns();
        this.setupSubscriptions();
    }

    confirm() {}

    save() {
        msg.publish('Profile.Save', 'spinning');
            
        http.put('/users/' + this.currentUser.id, {
            firstName: this.firstName(),
            lastName: this.lastName(),
            streetAddress: this.streetAddress(),
            city: this.city(),
            zip: this.zip(),
            homePhone: this.homePhone(),
            mobilePhone: this.mobilePhone(),
            email: (this.email()) ? this.email() : undefined,
            password: (this.password()) ? this.password() : undefined
        })
        .then((user) => {
            cookie.set('_user', user);
            msg.trigger('#Navbar', 'App.CurrentUser', user);
            msg.publish('Profile.Success', 'Saved Successful!');
        })
        .catch(() => {
            msg.publish('Profile.Error', 'Error: Save Unsuccessfully. Please try again later.');
        })
        .fin(() => { msg.publish('Profile.Save', 'enabled'); })
        .done();  
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
            this.firstName(this.currentUser.firstName);
            this.lastName(this.currentUser.lastName);
            this.streetAddress(this.currentUser.streetAddress);
            this.city(this.currentUser.city);
            // this.state(this.currentUser.state);
            // this.country(this.currentUser.country);
            this.zip(this.currentUser.zip);
            this.homePhone(this.currentUser.homePhone);
            this.mobilePhone(this.currentUser.mobilePhone);
            this.email(this.currentUser.email);
        }
    }

    _createWidgets() {
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
    }

    // _createDropdowns() {
    //     dropdownWidget.create({
    //         id: 'CountryDropdown',
    //         change: ['Profile.Country'],
    //         dataTextField: 'name',
    //         dataValueField: 'code',
    //         dataSource: { 
    //             transport: { 
    //                 read: '/countries' 
    //             }
    //         },
    //         value: this.country()
    //     });

    //     dropdownWidget.create({
    //         id: 'StateDropdown',
    //         change: ['Profile.State'],
    //         dataTextField: 'name',
    //         dataValueField: 'abbreviation',
    //         dataSource: { 
    //             transport: { 
    //                 read: '/states' 
    //             }
    //         }, 
    //         value: this.state()
    //     });
    // }
}

export default ProfileViewModel;