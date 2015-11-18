System.config({

  baseURL: "",
  defaultJSExtensions: true,
  transpiler: "traceur",

  paths: {
    
    // Routes
    "dev.router": "screens/_dev/dev.router",
    "home.router": "screens/home/home.router",
    "login.router": "screens/login/login.router",
    "profile.router": "screens/profile/profile.router",
    
    // Widgets
    "base-widget.viewmodel": "widgets/core/base/base-widget.viewmodel",
    "button.widget"        : "widgets/core/button/button",
    "dropdown.widget"      : "widgets/core/dropdown/dropdown",
    "grid.widget"          : "widgets/core/grid/grid",
    "input.widget"         : "widgets/core/input/input",

    "navbar.viewmodel"     : "widgets/navbar/navbar.viewmodel",
    
    // Core
    "sandbox": "core/sandbox/sandbox",
    
    // Vendor
    "bootstrap"       : "vendor/bootstrap/dist/js/bootstrap",
    "jquery"          : "vendor/jquery/dist/jquery.min",
    "js-cookie"       : "vendor/js-cookie/src/js.cookie",
    "knockout"        : "vendor/knockout/dist/knockout.debug.js",
    "knockout-postbox": "vendor/knockout-postbox/build/knockout-postbox",
    "lodash"          : "vendor/lodash/lodash.min",
    "moment"          : "vendor/moment/moment",
    "q"               : "vendor/q/q",
    "sammy"           : "vendor/sammy/lib/sammy",
    "traceur"         : "vendor/traceur/traceur.min",
    "traceur-runtime" : "vendor/traceur-runtime/traceur-runtime.min",
    
    // Plugins
    "css" : "vendor/plugin-css/css",
    "json": "vendor/plugin-json/json",
    "text": "vendor/plugin-text/text"
  },

  meta: {
    "bootstrap": { "deps": ["jquery"] },
    "sammy": { "deps": ["jquery"] }
  },

  map: {
    "k": "vendor/kendo/js",
  }

});
