(function (window)
{
    'use strict';

    var MathUtil = function ()
    {
        this.set(r, g, b, a);
    };

    MathUtil.isWithinRange = function(value, min, max)
    {
        return (value <= max) && (value >= min);
    };

    MathUtil.clampWithinRange = function(value, min, max)
    {
        return Math.min(Math.max(value, min), max);
    };

    window.MathUtil = MathUtil;

})(window);