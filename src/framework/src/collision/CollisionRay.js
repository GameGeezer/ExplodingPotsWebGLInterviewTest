(function(window) {
    'use strict';

    var CollisionRay = function(origin, direction) {

        this.origin = origin;
        this.direction = direction;
    };

    CollisionRay.prototype = {

        constructor: CollisionRay,

        intersectsSphere: function (sphere) {


        }
    };

    window.Game = Game;

})(window);