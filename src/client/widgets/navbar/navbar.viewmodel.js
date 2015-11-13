'use strict';

import $ from 'jquery';
import ko from 'knockout';

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

    setupSubscriptions() {
        this.$selector.on('App.CurrentUser', (e, val) => {
            this.currentUser(val);
        });
    }
}


export default NavbarViewModel;
