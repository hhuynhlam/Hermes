'use strict';

import $ from 'jquery';
import sandbox from 'sandbox';

var router = function (app) {

    // root
    app.get('/#/', function (context) {
        System.import('screens/home/home.html!text').then(function (template) {

            // pre-load bg image
            var _bgImg = new Image();
            _bgImg.src = '/public/images/main-bg.jpg';
            
            // set app to ready
            $(_bgImg).load( () =>  { 
                
                // render partial view
                context.swap(sandbox.util.template(template)); 
            });

            // set screen title
            sandbox.msg.trigger('#Navbar', 'App.Screen', 'Home');
        });
    });

    // headless support
    app.get(/\/#\/v/, function (context) {
        app.headless = true;
        app.runRoute(context.verb, context.path.replace('/v', ''), context.params, context.target);
    });

    // before all non /v/ routes, check headless and reset
    app.before({ except: { path: /\/#\/v/ } }, function () {
        if (app.headless) { 
            sandbox.msg.trigger('#Navbar', 'App.Headless', true);
            $('body').addClass('headless'); 
            app.headless = false;
        } else {
            sandbox.msg.trigger('#Navbar', 'App.Headless', false); 
            $('body').removeClass('headless'); 
        }
    });
};

export default router;
