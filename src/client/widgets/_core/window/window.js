'use strict';

import $  from 'jquery';
import WindowViewModel from './window.viewmodel';

var windowViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new WindowViewModel(options);

        $selector.addClass('uly-core-window');
        _viewModel.init();
    }

};

export default windowViewModel;
