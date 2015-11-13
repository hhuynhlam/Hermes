'use strict';

import ko from 'knockout';

class LoginViewModel {
    constructor(options) {
        this.options = options || {};

        this.email = ko.observable('');
        this.emailError = ko.observable(false);

        this.password = ko.observable('');
        this.pwError = ko.observable(false);
    }   

    init() {}

    login() {
        this._validate();
    }

    _validate() {
        if (!this.email() || !this.password()) {
            if (!this.email()) { this.emailError(true); }
            else { this.emailError(false); }

            if (!this.password()) { this.pwError(true); }
            else { this.pwError(false); }

            return false;
        
        } else {
            this.emailError(false);
            this.pwError(false);
            return true;
        }
    }
}

export default LoginViewModel;