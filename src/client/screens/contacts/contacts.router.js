'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';

import ContactsViewModel from './contacts.viewmodel';

var router = function (app) {

    // profile
    app.get('/#/contacts', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/contacts/contacts.html!text').then(function (template) {
                var viewModel = new ContactsViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Contacts'));

                // initialize view model
                viewModel.init();
            });
        });
            
    });

};

export default router;
