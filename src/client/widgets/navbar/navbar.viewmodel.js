'use strict';

import ko from 'knockout';
// import sandbox from 'sandbox';

class NavbarViewModel {
    constructor(options) {
        this.options = options || {};
        
        this.isLoggedIn = ko.observable(false);
        this.init();
    }

    init() {
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.isLoggedIn.subscribeTo('App.IsLoggedIn');
    }
}


export default NavbarViewModel;
