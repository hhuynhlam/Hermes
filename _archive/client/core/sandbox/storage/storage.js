'use strict';

define(function () {
    // var store = require('store');

    var storage = {

        // local storage
        // read: function (name) { return store.get(name); },
        // remove: function (name) { store.remove(name); },
        // set: function (name, val) { store.set(name, val); }
        
        read: function (name) { return window.sessionStorage.getItem(name); },
        remove: function (name) { window.sessionStorage.removeItem(name); },
        set: function (name, val) { window.sessionStorage.setItem(name, val); }
    };

    return storage;
});