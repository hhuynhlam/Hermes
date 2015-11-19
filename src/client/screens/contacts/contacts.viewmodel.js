'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import gridWidget from 'grid.widget';

var msg = sandbox.msg;

class ContactsViewModel {
    constructor(options) {
        this.options = options || {};
        this.emails = ko.observableArray([]);
    }   

    init() {
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
        gridWidget.create({
            id: 'UsersList',
            
            filterable: false,
            pageable: false,
            reorderable: true,
            resizable: true,
            selectable: 'multiple, row',
            sortable: true,
            
            dataSource: { 
                transport: { 
                    read: {
                        type: 'POST',
                        url: '/users'  
                    }
                }
            },
            columns: [
                { field: 'firstName', title: 'First Name'}, 
                { field: 'lastName', title: 'Last Name'}, 
                { field: 'streetAddress', title: 'Address'}, 
                { field: 'country', title: 'Country'}, 
                // { field: 'state', title: 'State'}, 
                // { field: 'city', title: 'City'}, 
                { field: 'zip', title: 'Zip'}, 
                { field: 'homePhone', title: 'Home Phone' }, 
                { field: 'mobilePhone', title: 'Mobile Phone' },
                { field: 'email', title: 'Email'}
            ],

            change: () => {
                msg.publish('Contacts.EmailSelectedButton', 'enabled');
            },
            dataBound: () => {
                msg.publish('Contacts.EmailAllButton', 'enabled');
            }
        });

        buttonWidget.create({
            id: 'EmailAllButton',
            label: 'Email All',
            attributes: [{
                disabled: true
            }],
            styles: [
                'btn-primary',
                'btn-block',
                'disabled'
            ],
            subscribe: ['Contacts.EmailAllButton'],
            trigger: {
                click: ['EmailAllButton.Click']
            }
        });

        buttonWidget.create({
            id: 'EmailSelectedButton',
            label: 'Email Selected',
            attributes: [{
                disabled: true
            }],
            styles: [
                'btn-default',
                'btn-block',
                'disabled'
            ],
            subscribe: ['Contacts.EmailSelectedButton'],
            trigger: {
                click: ['EmailSelectedButton.Click']
            }
        });
    }

    _getEmails() {

    }

    _setupEvents() {
        var $eventElement = $(document);

        $eventElement.on('EmailAllButton.Click', () => {
            debugger;
        });

        $eventElement.on('EmailSelectedButton.Click', () => {
            debugger;
        });
    }
}

export default ContactsViewModel;