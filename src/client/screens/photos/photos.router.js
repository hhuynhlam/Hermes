'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';

import AlbumViewModel from './album/album.viewmodel';
import LibraryViewModel from './library/library.viewmodel';
import ViewerViewModel from './viewer/viewer.viewmodel';

var router = function (app) {

    // library
    app.get('/#/photos', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/photos/library/library.html!text').then(function (template) {
                var viewModel = new LibraryViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Library'));

                // initialize view model
                viewModel.init();
            });
        });
            
    });

    // album
    app.get('/#/photos/album/:id', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/photos/album/album.html!text').then(function (template) {
                var viewModel = new AlbumViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Album'));

                // initialize view model
                viewModel.init(context.params.id);
            });
        });
            
    });

    // viewer
    app.get('/#/photos/viewer/:id', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/photos/viewer/viewer.html!text').then(function (template) {
                var viewModel = new ViewerViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('Viewer'));

                // initialize view model
                viewModel.init(context.params.id);
            });
        });
            
    });
};

export default router;
