'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import gridWidget from 'grid.widget';

var _ = sandbox.util;
var msg = sandbox.msg;

class PhotosViewModel {
    constructor(options) {
        this.options = options || {};
        this.emails = ko.observable('');
    }   

    init() {
        this._createWidgets();
        this._setupEvents();
    }

    _createWidgets() {
        // gridWidget.create({
        //     id: 'UsersList',
            
        //     filterable: false,
        //     pageable: false,
        //     reorderable: true,
        //     resizable: true,
        //     selectable: 'multiple, row',
        //     sortable: true,
            
        //     dataSource: { 
        //         transport: { 
        //             read: {
        //                 type: 'POST',
        //                 url: '/users'  
        //             }
        //         }
        //     },
        //     columns: [
        //         {   field: 'firstName', title: 'First Name' },
        //         {   field: 'lastName', title: 'Last Name' },
        //         {   title: 'Address', 
        //             template: '#= streetAddress + "</br>" + \
        //             city + ", " + state + ", " + country + " " + zip #'}, 
        //         {   title: 'Phone', 
        //             template: '#= "Home: " + homePhone + "</br>" + \
        //             "Mobile: " + mobilePhone #'}, 
        //         {   field: 'email', title: 'Email'}
        //     ],

        //     change: () => {
        //         msg.publish('Contacts.EmailSelectedButton', 'enabled');
        //     },
        //     dataBound: () => {
        //         msg.publish('Contacts.EmailAllButton', 'enabled');
        //     }
        // });

        // buttonWidget.create({
        //     id: 'EmailAllButton',
        //     label: 'Email All',
        //     attributes: [{
        //         disabled: true
        //     }],
        //     styles: [
        //         'btn-primary',
        //         'btn-block',
        //         'disabled'
        //     ],
        //     subscribe: ['Contacts.EmailAllButton'],
        //     trigger: {
        //         click: ['EmailAllButton.Click']
        //     }
        // });

        // buttonWidget.create({
        //     id: 'EmailSelectedButton',
        //     label: 'Email Selected',
        //     attributes: [{
        //         disabled: true
        //     }],
        //     styles: [
        //         'btn-default',
        //         'btn-block',
        //         'disabled'
        //     ],
        //     subscribe: ['Contacts.EmailSelectedButton'],
        //     trigger: {
        //         click: ['EmailSelectedButton.Click']
        //     }
        // });
    }

    _setupEvents() {
        var $eventElement = $(document);
    }
}

export default PhotosViewModel;