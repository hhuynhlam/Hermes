'use strict';

import $  from 'jquery';
import ConfirmWindowViewModel from './confirmWindow.viewmodel';

var confirmWindowViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new ConfirmWindowViewModel(options);

        $selector.addClass('uly-confirm-window');
        _viewModel.init();
    }

};

export default confirmWindowViewModel;
