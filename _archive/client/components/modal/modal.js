'use strict';

define(function (require) {
    var $ = require('jquery');
    require('k/kendo.window.min');

    var templates = {
        logoutConfirm: require('text!components/modal/templates/logout-confirm.html'),
        saveConfirm: require('text!components/modal/templates/save-confirm.html')
    };

    var Modal = function (templateName, options) {
        var $modal = $(options.selector || '#Modal'),
            $kendoWindow, $cancel, $confirm;
            
        // init modal
        $modal.html(templates[templateName]);
        $modal.kendoWindow({ title: false, modal: true });
        $kendoWindow = $modal.data('kendoWindow');

        // setup selectors
        $cancel = (options.cancel) ? $(options.selector + ' .cancel') : undefined;
        $confirm = (options.confirm) ? $(options.selector + ' .confirm') : undefined;

        // setup click bindings
        if($cancel) {
            $cancel.on('click', function() { 
                if (typeof options.cancel === 'function') { options.cancel(); }
                $kendoWindow.close();
            }); 
        }

        if($confirm) {
            $confirm.on('click', function() { 
                if (typeof options.confirm === 'function') { options.confirm(); }
                $kendoWindow.close();
            }); 
        }
        
        $kendoWindow.center();
    };

    return Modal;
});