'use strict';

define(function (require) {
    var $ = require('jquery');
    require('k/kendo.multiselect.min');

    var MultiSelect = function (options) {
        var $selector = $(options.selector);

        $selector.kendoMultiSelect({
            dataTextField: options.textField,
            dataValueField: options.valueField,
            dataSource: options.data,
            change: options.onChange
        });
    };

    return MultiSelect;
});