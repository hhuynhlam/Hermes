'use strict';

define(function (require) {
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var AboutViewModel = require('about.viewmodel');
    var NavbarViewModel = require('navbar.viewmodel');

    var aboutRouter = function (app) {   
        
        app.get('/#/about', function (context) {
            require(['text!pages/about/about.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new AboutViewModel(), document.getElementById('About'));
            });
        });

        app.get('/#/about/contact', function (context) {
            require(['text!pages/about/templates/contact.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new AboutViewModel(), document.getElementById('Contact'));
            });
        });

        app.get('/#/about/history', function (context) {
            require(['text!pages/about/templates/history.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new AboutViewModel(), document.getElementById('History'));
            });
        });

        app.get('/#/about/links', function (context) {
            require(['text!pages/about/templates/links.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new AboutViewModel(), document.getElementById('AffiliateLinks'));
            });
        });

        app.get('/#/about/rush', function (context) {
            require(['text!pages/about/templates/rush.html'], function (template) {
                context.swap(sandbox.util.template(template));

                // apply ko bindings
                ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                ko.applyBindings(new AboutViewModel(), document.getElementById('Rush'));
            });
        });

    };

    return aboutRouter;

});