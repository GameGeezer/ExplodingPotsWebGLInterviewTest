(function (window)
{
    'use strict';

    /**
     *  A IBO(Index Buffer Object) is used to store integer vertex data
     *
     * @param gl
     * @param glElementSize
     * @constructor
     */
    var IBO = function (gl, glElementSize)
    {
        this.gl = gl;

        this.handle = gl.createBuffer();

        this.initialized = false;

        switch (glElementSize)
        {
            case this.gl.UNSIGNED_SHORT:

                this.createDataArrayFunction = createDataArray16;

                this.bytesPerElement = DataTypeUtil.SHORT_SIZE_BYTES;

                this.glElementSize = glElementSize;

                break;

            case this.gl.UNSIGNED_INT:

                this.createDataArrayFunction = createDataArray32;

                this.bytesPerElement = DataTypeUtil.INTEGER_SIZE_BYTES;

                this.glElementSize = glElementSize;

                break;

            default:

                throw new Exception("Unknown data type size requested for IBO");
        }
    };

    IBO.prototype = {

        constructor : IBO,

        initializeBuffer : function (indices, usage)
        {
            if (this.initialized)
            {
                throw new Exception("IBO already initialized");
            }

            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.createDataArrayFunction(indices), usage);

            this.initialized = true;
        },

        initializeEmpty : function (size, usage)
        {
            if (this.initialized)
            {
                throw new Exception("IBO already initialized");
            }

            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, size * this.bytesPerElement, usage);

            this.initialized = true;
        },

        bind : function ()
        {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.handle);
        },

        unbind : function ()
        {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        },

        destroy : function ()
        {
            this.gl.deleteBuffer(this.handle);
        },

        bufferSubData : function (offset, data)
        {
            this.gl.bufferSubData(this.gl.ELEMENT_ARRAY_BUFFER, offset, this.createDataArrayFunction(data))
        }
    };

    var createDataArray16 = function (indices)
    {
        return new Uint16Array(indices)
    };

    var createDataArray32 = function (indices)
    {
        return new Uint32Array(indices)
    };

    window.IBO = IBO;

})(window);