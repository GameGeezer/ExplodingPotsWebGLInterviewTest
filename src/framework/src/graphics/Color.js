(function (window)
{
    'use strict';

    var CHANNEL_MIN = 0.0;

    var CHANNEL_MAX = 1.0;

    var Color = function (r, g, b, a)
    {
        this.set(r, g, b, a);
    };

    Color.prototype = {

        constructor : Color,

        set : function (r, g, b, a)
        {
            this.r = MathUtil.clampWithinRange(r, CHANNEL_MIN, CHANNEL_MAX);

            this.g = MathUtil.clampWithinRange(g, CHANNEL_MIN, CHANNEL_MAX);

            this.b = MathUtil.clampWithinRange(b, CHANNEL_MIN, CHANNEL_MAX);

            this.a = MathUtil.clampWithinRange(a, CHANNEL_MIN, CHANNEL_MAX);
        }
    };

    window.Color = Color;

})(window);