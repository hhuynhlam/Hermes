'use strict';

define(function (require) {
    var auth = require('auth');
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var NavbarViewModel = require('navbar.viewmodel');
    var ProfileViewModel = require('profile.viewmodel');

    var profileRouter = function (app) {   
        
        app.get('/#/profile', function (context) {
            if(!auth.isLoggedIn()) { window.location.replace(window.env.CLIENT_HOST + '/login'); }
            else {
                require(['text!pages/profile/profile.html'], function (template) {
                    context.swap(sandbox.util.template(template));

                    // apply ko bindings
                    ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                    ko.applyBindings(new ProfileViewModel(), document.getElementById('Profile'));
                });
            }
        });

    };

    return profileRouter;

});