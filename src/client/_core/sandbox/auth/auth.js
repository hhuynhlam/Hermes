'use strict';

import sandbox from 'sandbox';

var auth = {
    checkIsAuth: function (callback) {
        if ( !sandbox.cookie.get('_user') ) { 
            window.location.replace('/#/login'); 
        
        } else {
            callback.call(this);
        }
    },

    checkIsNotAuth: function (callback) {
        if ( sandbox.cookie.get('_user') ) { 
            window.location.replace('/#/'); 
        
        } else {
            callback.call(this);
        }
    },

    getCurrentUser: function () {
        var currentUser = sandbox.cookie.get('_user');
        return (currentUser) ? JSON.parse(currentUser) : null;
    }
};

export default auth;
