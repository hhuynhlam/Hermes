'use strict';

import $  from 'jquery';
import GridViewModel from './grid.viewmodel';

var gridViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new GridViewModel(options);

        $selector.addClass('uly-core-grid');
        _viewModel.init();
    }

};

export default gridViewModel;
