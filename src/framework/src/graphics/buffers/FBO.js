(function (window)
{
    'use strict';
    
    var FBO = function (gl, width, height)
    {
        this.gl = gl;

        this.handle = this.gl.createFramebuffer();

        this.bind()

        this.handle.width = width;

        this.handle.height = height;

        this.unbind();
    };

    FBO.prototype = {

        constructor : FBO,

        bind : function ()
        {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.handle);
        },

        unbind : function ()
        {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        },

        attach: function(textureHandle, renderBufferHandle)
        {
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, textureHandle, 0);
            this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, renderBufferHandle);
        }
    };

    window.FBO = FBO;

})(window);