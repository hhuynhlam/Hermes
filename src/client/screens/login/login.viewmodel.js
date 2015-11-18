'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';
import alertWidget from 'alert.widget';
import buttonWidget from 'button.widget';

var http = sandbox.http;
var msg = sandbox.msg;

class LoginViewModel {
    constructor(options) {
        this.options = options || {};

        this.email = ko.observable('');
        this.emailError = ko.observable(false);
        this.password = ko.observable('');
        this.pwError = ko.observable(false);
    }   

    init() {
        this._createWidgets();
    }

    login() {
        if (this._validate() ) {
            msg.publish('Login.SignInButton', 'spinning');
            
            http.post('/auth/login', {
                email: this.email(),
                password: this.password()
            })
            .then((user) => {
                msg.trigger('#Navbar', 'App.CurrentUser', user);
                window.location.replace('/#/');
            })
            .catch(() => {
                msg.publish('Login.Error', 'Unauthorized - Please check your email and password.');
            })
            .fin(() => { msg.publish('Login.SignInButton', 'enabled'); })
            .done();  
        }
    }

    _createWidgets() {
        alertWidget.create({
            id: 'LoginAlert',
            position: {
                top: 60,
                right: 10
            },
            subscribe: {
                error: 'Login.Error',
                success: 'Login.Success',
                info: 'Login.Info',
                warning: 'Login.Warning'
            }
        });

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