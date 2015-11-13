'use strict';

import ko from 'knockout';
// import sandbox from 'sandbox';

class NavbarViewModel {
    constructor(options) {
        this.options = options || {};
        
        this.currentUser = ko.observable();
        this.init();
    }

    init() {
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.currentUser.subscribeTo('App.CurrentUser', true);
    }
}


export default NavbarViewModel;
