(function (window)
{
    'use strict';

    /**
     * Contains the index size and offset into the index buffer of a mesh
     * @constructor
     */
    var Mesh = function (gl)
    {
        this.gl = gl;
        this.family = undefined;
    };

    Mesh.prototype = {

        constructor : Mesh,

        /**
         *
         * @param glContext
         */
        render : function ()
        {
            this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.iboType, this.indexOffset);
        },

        /**
         *
         * @param indexOffset - The offset in bytes into the index buffer in which to start
         * @param indexCount - The number of indices past offset in which to draw
         */
        set : function (indexOffset, indexCount, iboType, family)
        {
            this.indexOffset = indexOffset;

            this.indexCount = indexCount;

            this.iboType = iboType;

            this.family = family;
        }
    };

    window.Mesh = Mesh;

})(window);