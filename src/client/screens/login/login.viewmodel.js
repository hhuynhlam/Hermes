'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';
import buttonWidget from 'button.widget';

var http = sandbox.http;

class LoginViewModel {
    constructor(options) {
        this.options = options || {};

        this.email = ko.observable('');
        this.emailError = ko.observable(false);
        this.password = ko.observable('');
        this.pwError = ko.observable(false);
        this.formError = ko.observable('');
    }   

    init() {
        this._createButtons();
    }

    login() {
        if (this._validate() ) {
            http.post('/auth/login', {
                email: this.email(),
                password: this.password()
            })
            .then(() => {
                debugger;
            })
            .catch(() => {
                this.formError('Unauthorized: Please check your email and password.');
            })
            .done();  
        }
    }

    _createButtons() {
        buttonWidget.create({
            id: 'SignInButton',
            label: 'Sign In',
            attributes: [{
                type: 'submit'
            }],
            styles: [
                'btn-primary',
                'btn-block'
            ],
            subscribe: ['Login.SignInButton']
        });
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