/**
 * Created by wpger_000 on 8/5/2016.
 */

(function (window)
{
    'use strict';

    var Light = function (color)
    {
        this.intensity = 1.0;

        //  How quickly the light's impact fades
        this. attenuation = 1.0;

        this.color = color;
    };

    Light.prototype = {

        constructor : Light,

        use : function (view, projection)
        {

        }
    };

    window.Light = Light;

})(window);