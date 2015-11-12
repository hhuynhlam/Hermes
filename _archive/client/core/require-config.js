require.config({
    baseUrl: '',
    paths: {

        // Components
        'modal'                         : 'components/modal/modal',
        'multi-select'                  : 'components/multi-select/multi-select',
        'navbar.viewmodel'              : 'components/navbar/navbar.viewmodel',
        
        // Pages
        'about.viewmodel'               : 'pages/about/about.viewmodel',
        'about.router'                  : 'pages/about/about.router',

        'event-action.viewmodel'        : 'pages/event/event-action.viewmodel',
        'event-calendar.viewmodel'      : 'pages/event/event-calendar.viewmodel',
        'event-detail.viewmodel'        : 'pages/event/event-detail.viewmodel',
        'event-list.viewmodel'          : 'pages/event/event-list.viewmodel',
        'event-shift.viewmodel'         : 'pages/event/event-shift.viewmodel',
        'event.router'                  : 'pages/event/event.router',

        'home.viewmodel'                : 'pages/home/home.viewmodel',
        'home.router'                   : 'pages/home/home.router',

        'login.viewmodel'               : 'pages/login/login.viewmodel',
        'login.router'                  : 'pages/login/login.router',

        'member.viewmodel'              : 'pages/member/member.viewmodel',
        'member.router'                 : 'pages/member/member.router',

        'profile.viewmodel'             : 'pages/profile/profile.viewmodel',
        'profile.router'                : 'pages/profile/profile.router',

        // Core
        'sandbox'                       : 'core/sandbox/sandbox',

        // Services
        'auth'                          : 'services/auth/auth',
        'role'                          : 'services/role/role',

        // Vendor
        'bootstrap'                     : 'vendor/bower_components/bootstrap/dist/js/bootstrap.min',
        'fullcalendar'                  : 'vendor/bower_components/fullcalendar/dist/fullcalendar.min',
        'jquery'                        : 'vendor/bower_components/jquery/dist/jquery.min',
        'k'                             : 'vendor/bower_components/kendo/js',
        'knockout'                      : 'vendor/bower_components/knockout/dist/knockout',
        'knockout-postbox'              : 'vendor/bower_components/knockout-postbox/build/knockout-postbox.min',
        'lodash'                        : 'vendor/bower_components/lodash/dist/lodash.min',
        'md5'                           : 'vendor/bower_components/blueimp-md5/js/md5.min',
        'moment'                        : 'vendor/bower_components/moment/min/moment.min',
        'Q'                             : 'vendor/bower_components/q/q',
        'sammy'                         : 'vendor/bower_components/sammy/lib/min/sammy-0.7.6.min',
        'store'                         : 'vendor/bower_components/store/store.min',

        // RequireJS Plugins
        'async'                         : 'vendor/bower_components/requirejs-plugins/src/async',
        'font'                          : 'vendor/bower_components/requirejs-plugins/src/font',
        'goog'                          : 'vendor/bower_components/requirejs-plugins/src/goog',
        'image'                         : 'vendor/bower_components/requirejs-plugins/src/image',
        'json'                          : 'vendor/bower_components/requirejs-plugins/src/json',
        'markdownConverter'             : 'vendor/bower_components/requirejs-plugins/lib/Markdown.Converter',
        'mdown'                         : 'vendor/bower_components/requirejs-plugins/src/mdown',
        'noext'                         : 'vendor/bower_components/requirejs-plugins/src/noext',
        'propertyParser'                : 'vendor/bower_components/requirejs-plugins/src/propertyParser',
        'text'                          : 'vendor/bower_components/requirejs-plugins/lib//text'
    },
    
    shim: {
        'jquery'                        : { exports: 'jQuery' },
        'bootstrap'                     : { deps: ['jquery'] },
        'fullcalendar'                  : { deps: ['jquery'] },
        'k/kendo.core.min'              : { deps: ['jquery'] },
        'sammy'                         : { deps: ['jquery'] }
    },

    map: {
        '*': {
            'css'                       : 'vendor/bower_components/require-css/css.min',   // RequireJS CSS Plugin
            'kendo'                     : 'k/kendo.core.min'
        }
    }
});