'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';

import LoginViewModel from './login.viewmodel';

var router = function (app) {

    // root
    app.get('/#/login', function (context) {
        var _user = sandbox.cookie.get('_user');
        
        if (_user) { 
            window.location.replace('/#/'); 
        
        } else {
            System.import('screens/login/login.html!text').then(function (template) {
                var viewModel = new LoginViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Login'));

                // initialize view model
                viewModel.init();
            });
        }
    });

};

export default router;
