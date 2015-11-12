'use strict';

define(function (require) {
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var HomeViewModel = require('home.viewmodel');
    var NavbarViewModel = require('navbar.viewmodel');

    var homeRouter = function (app) {   
        
        app.get('/#/', function (context) {
            require(['text!pages/home/home.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new HomeViewModel(), document.getElementById('Home'));
            });
        });

    };

    return homeRouter;

});