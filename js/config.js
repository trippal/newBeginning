var App = {};
requirejs.config({

    locale: "ru",

    baseUrl: '/git/newBeginning/js/',

    waitSeconds: 60,

    paths: {
        jquery: 	'libs/jquery/jquery',
        underscore:	'libs/underscore/underscore-min',
        backbone:	'libs/backbone/backbone-min',
        leaflet:	'libs/leaflet/leaflet',
        less:       'libs/lessjs/less.min',
        appView:    'AppView'

    },

    shim: {
        app: {
            deps: ["leaflet"]
        }
    }
});

// Dependencies Requests
require([
    'backbone',
    'underscore',
    'jquery',
    'appView',

    //
    'less'
],function(Backbone, _, $, AppView){
    App = new AppView({

    });
    App.render();
});


