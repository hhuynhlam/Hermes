'use strict';

define(function (require) {
    var auth = require('auth');
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var LoginViewModel = require('login.viewmodel');
    var NavbarViewModel = require('navbar.viewmodel');

    var loginRouter = function (app) {   
        
        app.get('/#/login', function (context) {
            if(auth.isLoggedIn()) { window.location.replace(window.env.CLIENT_HOST); }
            else {
                require(['text!pages/login/login.html'], function (template) {
                    context.swap(sandbox.util.template(template));

                    // apply ko bindings
                    ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                    ko.applyBindings(new LoginViewModel(), document.getElementById('Login'));
                });
            }
        });

    };

    return loginRouter;

});