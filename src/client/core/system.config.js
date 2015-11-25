System.config({

  baseURL: "",
  defaultJSExtensions: true,
  transpiler: "traceur",

  paths: {
    
    // Routes
    "dev.router": "screens/_dev/dev.router",
    "contacts.router": "screens/contacts/contacts.router",
    "home.router": "screens/home/home.router",
    "login.router": "screens/login/login.router",
    "photos.router": "screens/photos/photos.router",
    "profile.router": "screens/profile/profile.router",
    
    // Widgets
    "alert.widget"         : "widgets/core/alert/alert",
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
    "imagesloaded"    : "vendor/imagesloaded/imagesloaded.pkgd",
    "jquery"          : "vendor/jquery/dist/jquery",
    "js-cookie"       : "vendor/js-cookie/src/js.cookie",
    "knockout"        : "vendor/knockout/dist/knockout.debug",
    "knockout-postbox": "vendor/knockout-postbox/build/knockout-postbox",
    "lodash"          : "vendor/lodash/lodash.min",
    "masonry"         : "vendor/masonry/dist/masonry.pkgd",
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
    "masonry": { "deps": ["jquery"] },
    "sammy": { "deps": ["jquery"] }
  },

  map: {
    "k": "vendor/kendo/js",
  }

});
