/**
 * Created by wpger_000 on 8/5/2016.
 */

(function (window)
{
    'use strict';

    var uniqueId = 0;

    var Material = function (shaderId)
    {
        this.uniqueId = uniqueId++;
        this.shaderId = shaderId;
    };

    Material.prototype = {

        constructor : Material,

        bind : function (glContext)
        {

        }
    };

    window.Material = Material;

})(window);