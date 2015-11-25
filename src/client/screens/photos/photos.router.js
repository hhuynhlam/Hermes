'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';

import PhotosViewModel from './photos.viewmodel';

var router = function (app) {

    // profile
    app.get('/#/photos', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/photos/photos.html!text').then(function (template) {
                var viewModel = new PhotosViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Photos'));

                // initialize view model
                viewModel.init();
            });
        });
            
    });

};

export default router;
