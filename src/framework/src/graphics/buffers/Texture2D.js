(function (window)
{
    'use strict';

    /**
     *
     * @param gl - The webGL context
     * @param format - The color components of the texture
     * @param dataType - How the texels are formatted
     * @param pixels - The data
     * @constructor
     */
    var Texture2D = function (gl)
    {
        //  Hold on to the gl context
        this.gl = gl;

        //  Allocate a buffer and store the handle
        this.handle = gl.createTexture();
    };

    Texture2D.prototype = {

        constructor : Texture2D,

        initializeFromImage : function (format, dataType, pixels)
        {
            this.bind();
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, format, dataType, pixels);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        },

        initializeFromDimensions : function (format, dataType, width, height)
        {
            this.bind();
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, format, width, height, 0, format, dataType, null);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        },

        bind : function ()
        {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);
        },

        unbind : function ()
        {
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        }
    };

    window.Texture2D = Texture2D;

})(window);