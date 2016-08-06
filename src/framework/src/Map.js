
(function(window) {
    'use strict';

    Map = function() {

    };

    Map.prototype = {

        constructor: Map,

        put: function(key, value) {

            this[ key ] = value;
        },
        get: function(key) {

            return this[ key ];
        },
        remove: function(key) {

            this[ key ] = null;
        },
        contains: function(key) {

            return this.hasOwnProperty(key);
        }
    };

    window.Map = Map;

})(window);
