(function (window)
{
    'use strict';

    /**
     *  A VBO(Vertex Buffer Object) is used to store float vertex data
     *
     * @param gl - The webGL context
     * @constructor
     */
    var VBO = function (gl)
    {
        //  Hold on to the gl context
        this.gl = gl;

        //  Allocate a buffer and store the handle
        this.handle = gl.createBuffer();

        this.initialized = false;
    };

    VBO.prototype = {

        constructor : VBO,

        initializeBuffer : function (vertices, usage)
        {
            if (this.initialized)
            {
                throw new Exception("VBO already initialized");
            }

            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), usage);

            this.initialized = true;
        },

        initializeEmpty : function (size, usage)
        {
            if (this.initialized)
            {
                throw new Exception("VBO already initialized");
            }

            this.gl.bufferData(this.gl.ARRAY_BUFFER, size * DataTypeUtil.FLOAT_SIZE_BYTES, usage);

            this.initialized = true;
        },

        bind : function ()
        {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.handle);
        },

        unbind : function ()
        {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        },

        destroy : function ()
        {
            this.gl.deleteBuffer(this.handle);
        },

        bufferSubData : function (offset, data)
        {
            this.gl.bufferSubData(this.gl.ARRAY_BUFFER, offset, new Float32Array(data))
        }
    };

    window.VBO = VBO;

})(window);