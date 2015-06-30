'use strict';

define(function (require) {
    var _ = require('lodash');

    var utils = {

        assign: _.assign,
        clone: _.clone,
        find: _.find,
        findIndex: _.findIndex,
        forIn: _.forIn,
        template: _.template,

        nlToBr: function (str, is_xhtml) {   
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        }

    };

    return utils;
});