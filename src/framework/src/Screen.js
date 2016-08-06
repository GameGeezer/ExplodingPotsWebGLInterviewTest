(function(window) {
    'use strict';

    var Screen = function() {

        this.created = false;
    };

    Screen.prototype = {

        constructor: Screen,

        onCreate: function() {

            throw new UnimplementedFunctionException('onCreate');
        },
        onUpdate: function(delta) {

            throw new UnimplementedFunctionException('onUpdate');
        },
        onRender: function(delta) {

            throw new UnimplementedFunctionException('onRender');
        },
        onPause: function() {

            throw new UnimplementedFunctionException('onPause');
        },
        onLeave: function() {

            throw new UnimplementedFunctionException('onLeave');
        },
        onResume: function() {

            throw new UnimplementedFunctionException('onResume');
        }
    };

    window.Screen = Screen;

})(window);