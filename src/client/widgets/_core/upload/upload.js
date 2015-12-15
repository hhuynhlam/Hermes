'use strict';

import $  from 'jquery';
import UploadViewModel from './upload.viewmodel';

var uploadViewModel = {
    
    create: function (options) {
        var $selector = $('#' + options.id),
            _viewModel = new UploadViewModel(options);

        $selector.addClass('uly-core-upload');
        _viewModel.init();
    }

};

export default uploadViewModel;
