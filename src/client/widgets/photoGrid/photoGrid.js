'use strict';

import $  from 'jquery';
import PhotoGridViewModel from './photoGrid.viewmodel';

var photoGridViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new PhotoGridViewModel(options);

        $selector.addClass('uly-photoGrid');
        _viewModel.init();
    }

};

export default photoGridViewModel;
