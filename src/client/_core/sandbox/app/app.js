'use strict';

import $ from 'jquery';

var app = {
    
    isLoading: function (bool) {
        if (bool) {
            $('#MainView').hide(); 
            $('#AppStatus').show();
        } else {
            $('#MainView').show(); 
            $('#AppStatus').hide();
        }
    }

};

export default app;
