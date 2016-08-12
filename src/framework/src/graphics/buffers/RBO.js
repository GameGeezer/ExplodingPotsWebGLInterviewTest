(function (window)
{
    'use strict';

    var RBO = function (gl, width, height)
    {
        this.gl = gl;

        this.handle = this.gl.createRenderbuffer();

        this.bind();

        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);

        this.unbind();
    };

    RBO.prototype = {

        constructor : RBO,

        bind : function ()
        {
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.handle);
        },

        unbind : function ()
        {
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        }
    };

    window.RBO = RBO;

})(window);