'use strict';

define(function (require) {
    var auth = require('auth');
    var ko = require('knockout');
    var sandbox = require('sandbox');
    var NavbarViewModel = require('navbar.viewmodel');
    var MemberViewModel = require('member.viewmodel');

    var memberRouter = function (app) {   
        
        app.get('/#/member/roster', function (context) {
            if(!auth.isLoggedIn()) { window.location.replace(window.env.CLIENT_HOST + '/login'); }
            else {
                require(['text!pages/member/member.html'], function (template) {
                    context.swap(sandbox.util.template(template));

                    // apply ko bindings
                    ko.applyBindings(new NavbarViewModel(), document.getElementById('Navbar'));
                    ko.applyBindings(new MemberViewModel(), document.getElementById('Member'));
                });
            }
        });

    };

    return memberRouter;

});