'use strict';

import $ from 'jquery';
import sandbox from 'sandbox';

var router = function (app) {

    // root
    app.get('/#/', function (context) {
        System.import('screens/home/home.html!text').then(function (template) {

            // pre-load bg image
            var _bgImg = new Image();
            _bgImg.src = '/public/images/autumn-leaves-bg.jpg';
            
            // set app to ready
            $(_bgImg).load( () =>  { 
                
                // render partial view
                context.swap(sandbox.util.template(template), function () {
                    $('body').addClass('full-page-background');
                }); 
            });
        });
    });

};

export default router;
