'use strict';

import ko from 'knockout';
import buttonWidget from 'button.widget';
import gridWidget from 'grid.widget';

class ContactsViewModel {
    constructor(options) {
        this.options = options || {};
        this.emails = ko.observableArray([]);
    }   

    init() {
        this._createWidgets();
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
            ]
        });

        buttonWidget.create({
            id: 'EmailAllButton',
            label: 'Email All',
            styles: [
                'btn-primary',
                'btn-block'
            ],
            subscribe: ['Contacts.EmailAllButton'],
            trigger: {
                click: { id: '#Contact', event: 'EmailAllButton.Click' }
            }
        });

        buttonWidget.create({
            id: 'EmailSelectedButton',
            label: 'Email Selected',
            styles: [
                'btn-default',
                'btn-block'
            ],
            subscribe: ['Contacts.EmailSelectedButton'],
            trigger: {
                click: { id: '#Contact', event: 'EmailSelectedButton.Click' }
            }
        });
    }
}

export default ContactsViewModel;