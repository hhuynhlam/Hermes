'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';
import gridWidget from 'grid.widget';

var _ = sandbox.util;
var msg = sandbox.msg;

class ContactsViewModel {
    constructor(options) {
        this.options = options || {};
        this.emails = ko.observable('');
        this.selectedContacts = ko.observableArray([]);
    }   

    init() {
        this._createWidgets();
        this._setupEvents();

        // subscribe to observable value
        this.selectedContacts.subscribe(() => {
            if (this.selectedContacts().length) {
                msg.publish('Contacts.EmailSelectedButton', 'enabled');
            } else {
                msg.publish('Contacts.EmailSelectedButton', 'disabled');
            }
        });
    }   

    _createWidgets() {
        gridWidget.create({
            id: 'UsersList',
            
            filterable: false,
            height: '55vh',
            pageable: false,
            reorderable: true,
            resizable: true,
            selectable: false,
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
                {   field: 'firstName', title: 'First Name' },
                {   field: 'lastName', title: 'Last Name' },
                
                {   title: 'Address', 
                    template: '#if (streetAddress) {# #=streetAddress# #} #  \
                               #if (city) {#</br># # #=city# #} # \
                               #if (city && state) {#, #} # \
                               #if (state) {# #=state.toUpperCase()# #} # \
                               #if (state && country) {#, #} # \
                               #=country# #=zip#'
                }, 
                
                {   title: 'Phone', 
                    template: '#if (primaryNumber) {# Primary: #=primaryNumber# #} #  \
                               #if (secondaryNumber) {#</br># # Secondary: #=secondaryNumber# #} #'
                }, 
                
                {   field: 'email', title: 'Email'}
            ],

            change: () => {
                msg.publish('Contacts.EmailSelectedButton', 'enabled');
            },
            dataBound: () => {
                
                // on row click
                $('#UsersList').find('tbody > tr').on('click', (e) => {
                    var $target =  $(e.currentTarget);
                    this.$grid = this.$grid || $('#UsersList').data('kendoGrid');

                    $target.toggleClass('k-state-selected'); 
                    this.selectedContacts( $('.k-state-selected') );
                });
                
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

    _getEmails(onlySelected) {
        var _emails = [];
        this.$grid = this.$grid || $('#UsersList').data('kendoGrid');

        if (onlySelected) {
            _.forEach(this.selectedContacts(), (s) => {
                _emails.push(this.$grid.dataItem(s).email);
            });
        } else {
            this.$grid.dataItems().forEach((row) => {
                _emails.push(row.email);
            });
        }

        return _emails.join(', ');
    }

    _setupEvents() {
        var $eventElement = $(document);

        $eventElement.on('EmailAllButton.Click', () => {
            this.emails( this._getEmails() );
        });

        $eventElement.on('EmailSelectedButton.Click', () => {
            this.emails( this._getEmails(true) );
        });
    }
}

export default ContactsViewModel;