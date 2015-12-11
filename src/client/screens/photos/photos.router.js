'use strict';

import ko from 'knockout';
import sandbox from 'sandbox';

import AlbumViewModel from './album/album.viewmodel';
import LibraryViewModel from './library/library.viewmodel';
import ViewerViewModel from './viewer/viewer.viewmodel';

import CreateAlbumViewModel from './upload/add_album.viewmodel';
import EditAlbumViewModel from './upload/edit_album.viewmodel';

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

                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', 'Album Library');
            });
        });
            
    });

    // album
    app.get('/#/photos/album/create', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/photos/upload/add_album.html!text').then(function (template) {
                var viewModel = new CreateAlbumViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('AddAlbum'));

                // initialize view model
                viewModel.init();

                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', 'Create Album');
            });
        });
            
    });

    app.get('/#/photos/album/edit/:id', function (context) {
        sandbox.auth.checkIsAuth(() => {
            System.import('screens/photos/upload/edit_album.html!text').then(function (template) {
                var viewModel = new EditAlbumViewModel();

                // render partial view
                context.swap(sandbox.util.template(template));
                
                // apply ko bindings
                ko.applyBindings(viewModel, document.getElementById('EditAlbum'));

                // initialize view model
                viewModel.init(context.params.id);

                // set screen title
                sandbox.msg.trigger('#Navbar', 'App.Screen', 'Edit Album');
            });
        });
            
    });

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
