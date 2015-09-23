define(['backbone', 'underscore'], function (Backbone, _) {
    var DEBUG = false;
    var model = Backbone.Model.extend({

        defaults: {

        },

        url: "JSON/mapconfig.json",

        parse: function (response) {
            if (DEBUG) console.debug("Map model parse");
            return response.mapproperties && response.mapproperties[0] || response;
        },

        initialize: function () {

        }
    });

    return model;

});