'use strict';

import $  from 'jquery';
import MasonryViewModel from './masonry.viewmodel';

var masonryViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new MasonryViewModel(options);

        $selector.addClass('uly-masonry');
        _viewModel.init();
    }

};

export default masonryViewModel;
