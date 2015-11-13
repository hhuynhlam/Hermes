'use strict';

import sandbox from 'sandbox';

var router = function (app) {

    // root
    app.get('/#/', function (context) {
        System.import('screens/home/home.html!text').then(function (template) {

            // render partial view
            context.swap(sandbox.util.template(template));
        });
    });

};

export default router;
