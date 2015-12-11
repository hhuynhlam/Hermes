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
        this.hidden = ko.observable(true);
        this.title = ko.observable('');
        this.init();
    }

    init() {
        this.setupSubscriptions();

        // readjust MainView, if Sidebar is out
        $('#SidebarHamburger').on('click', () => {
            $('#MainView').toggleClass('main-aside');
        });
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
        
        this.$selector.on('App.Headless', (e, val) => {
            this.hidden(val);
        });

        this.$selector.on('App.Screen', (e, val) => {
            this.title(val);
        });
    }
}


export default NavbarViewModel;
