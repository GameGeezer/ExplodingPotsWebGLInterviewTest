(function (window)
{
    'use strict';

    var Geometry = function ()
    {
        this.vertexData = [];

        this.indices = [];
    };

    Geometry.prototype = {

        constructor : Geometry,

        /**
         *
         * @param vertexData - A float or array of floats
         */
        addVertexData : function (vertexData)
        {
            this.vertexData.push(vertexData);
        },

        /**
         *
         * @param indices - An integer or array of integers
         */
        addIndices : function (indices)
        {
            this.indices.push(indices);
        }
    };

    window.Geometry = Geometry;

})(window);