'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';

var cookie = sandbox.cookie;
var http = sandbox.http;

class NavbarViewModel {
    constructor(options) {
        this.options = options || {};
        this.$selector = $('#Navbar');
        
        this.currentUser = ko.observable();
        this.init();
    }

    init() {
        this.setupSubscriptions();
    }

    logout() {
        http.get('/auth/logout')
        .then(() => {
            this.currentUser(null);
            cookie.remove('_user', { path: '/' });
            window.location.replace('/#/');
        })
        .done();
    }

    setupSubscriptions() {
        this.$selector.on('App.CurrentUser', (e, val) => {
            this.currentUser(val);
        });
    }
}


export default NavbarViewModel;
