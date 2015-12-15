'use strict';

import $ from 'jquery';
import ko from 'knockout';
import sandbox from 'sandbox';

import ButtonViewModel from './button.viewmodel';
import ButtonTemplate from 'widgets/_core/button/button.html!text';

var buttonViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewmodel = new ButtonViewModel(options);

        $selector.html( sandbox.util.template(ButtonTemplate) );
        ko.applyBindings(_viewmodel, $selector[0]);
    
        _viewmodel.init();
    }

};

export default buttonViewModel;
