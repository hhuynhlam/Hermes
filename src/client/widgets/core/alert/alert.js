'use strict';

import $  from 'jquery';
import AlertViewModel from './alert.viewmodel';

var alertViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new AlertViewModel(options);

        $selector.addClass('uly-core-alert');
        _viewModel.init();
    }

};

export default alertViewModel;
