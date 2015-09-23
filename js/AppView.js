define([
        'backbone',
        'underscore',
        'leaflet',

        'models/mapModel'
    ],

    function (Backbone,
              _,
              L,
              Model) {

        var DEBUG = false;

        var AppView = Backbone.View.extend({

            events: {},

            el: '#map',

            template: "",

            initialize: function () {
                _.bindAll.apply(_, [this].concat(_.functions(this)));
                if (DEBUG) console.debug("AppView Init");
                this.model = new Model();
            },
            render: function () {
                var self = this;
                this.model.fetch({
                    success: function (collection, response) {
                        console.debug("success", collection, response);
                        self.renderOnSuccess();
                    },
                    error: function (collection, response) {
                        console.debug("success", collection, response);
                    }
                });
            },
            renderOnSuccess: function(){
                console.debug("qwe");
                this.map = L.map('map', {
                    center: this.model.get("center"),
                    zoom: this.model.get("zoom"),
                    minZoom: this.model.get("minZoom"),
                    maxZoom: this.model.get("maxZoom")
                });
                L.tileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png", {}).addTo(this.map);
            }
        });

        return AppView;

    });