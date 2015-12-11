'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';

import ProfileViewModel from './profile.viewmodel';

var router = function (app) {

    // profile
    app.get('/#/profile', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/profile/profile.html!text').then(function (template) {
                var viewModel = new ProfileViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Profile'));

                // initialize view model
                viewModel.init();

                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', 'Edit Profile');
            });
        });
    });

};

export default router;
