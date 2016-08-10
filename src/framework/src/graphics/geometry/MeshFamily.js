(function(window) {
    'use strict';

    /**
     * To avoid needless buffer binds it can be efficient to store the vertex data of multiple meshed in
     * a single buffer. When rendering, bind the family once and then make all draw calls for meshes associated with
     * the family. Every mesh in a mesh family needs to have their vertices stored in the same format.
     * @constructor
     */
    var MeshFamily = function(gl) {
        this.gl = gl;
        //  Objects containing raw vertex and index data
        this.geometryList = [];
        //  Once the geometry is loaded ont the gpu, it's vertex
        //  and index memory offsets will be stored in a mesh
        this.meshList = [];

        this.attributeLocations = [];
        this.attributeSizes = [];
        this.attributeOffsets = [];
        this.strideSize = 0;

        this.sizeOfVertex = 0;

        this.initialized = false;
    };

    MeshFamily.prototype = {

        constructor: MeshFamily,

        /**
         * Binds the vertex and index buffer to device memory and sets up the vertex attribute pointers
         * @param gl
         */
        bind: function()
        {
            this.vertexBuffer.bind();

            this.indexBuffer.bind();

            for(var i = 0; i < this.attributeLocations.length; ++i)
            {
                this.gl.vertexAttribPointer(this.attributeLocations[i], this.attributeSizes[i], this.gl.FLOAT, false, this.strideSize, this.attributeOffsets[i]);
            }
        },

        /**
         * 
         * @param gl
         */
        unbind: function()
        {
            this.vertexBuffer.unbind();

            this.indexBuffer.unbind();

            for(var i = 0; i < this.attributeLocations.length; ++i)
            {
                this.gl.disableVertexAttribArray(this.attributeLocations[i]);
            }
        },

        destroy: function()
        {
            this.vertexBuffer.destroy();

            this.indexBuffer.destroy();
        },

        /**
         *
         * @param geometry - Contains locally buffered vertex and index data
         * @param out_mesh - Once 'createFamily' is called, out_mesh will contain geometry's location in device memory
         */
        addToFamily: function(geometry, out_mesh)
        {
            this.geometryList.push(geometry);

            this.meshList.push(out_mesh);
        },

        /**
         *
         * @param gl
         * @post Local family references will be purged in case they should be garbage collected
         */
        createFamily: function()
        {
            if(this.initialized)
            {
                return;
            }

            var vertexBufferElementCount = 0;

            var indexBufferElementCount = 0;

            for(var i = 0; i < this.geometryList.length; ++i)
            {
                vertexBufferElementCount += this.geometryList[i].vertexData.length;

                indexBufferElementCount += this.geometryList[i].indices.length;
            }

            this.vertexBuffer = new VBO(this.gl);

            var iboDataType = indexBufferElementCount < DataTypeUtil.UNSIGNED_SHORT_MAX ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT;

            this.indexBuffer = new IBO(this.gl, iboDataType);

            this.bind();

            this.vertexBuffer.initializeEmpty(vertexBufferElementCount, this.gl.STATIC_DRAW);

            this.indexBuffer.initializeEmpty(indexBufferElementCount, this.gl.STATIC_DRAW);

            var dummy = 0;
            //  Create a mesh for each geometry
            for(var i = 0; i < this.geometryList.length; ++i)
            {
                this.meshList[i].set(dummy, this.geometryList[i].indices.length, this.indexBuffer.glElementSize);

                //  Acting as the current offset into the index buffer
                dummy += this.geometryList[i].indices.length * this.indexBuffer.bytesPerElement;
            }

            var vertexBufferOffset = 0;

            var indexBufferOffset = 0;

            var vertexElementOffset = 0;

            for(var i = 0; i < this.geometryList.length; ++i)
            {
                //  Copy the geometry's data to the buffers
                this.vertexBuffer.bufferSubData(vertexBufferOffset, this.geometryList[i].vertexData);


                var indicesToCopy = this.geometryList[i].indices;

                if(i !== 0)
                {
                    indicesToCopy = this.geometryList[i].indices.slice(0);
                    
                    for(var j = 0; j < indicesToCopy.length; ++j)
                    {
                        indicesToCopy[j] += vertexElementOffset;
                    }
                }


                this.indexBuffer.bufferSubData(indexBufferOffset, indicesToCopy);

                vertexElementOffset += this.geometryList[i].vertexData.length / this.sizeOfVertex;

                vertexBufferOffset += this.geometryList[i].vertexData.length * DataTypeUtil.FLOAT_SIZE_BYTES;

                indexBufferOffset += this.geometryList[i].indices.length * this.indexBuffer.bytesPerElement;

                this.geometryList[i] = null;

                this.meshList[i] = null;
            }

            this.geometryList = null;

            this.meshList = null;

            this.initialized = true;
        },

        /**
         *
         * @param location - The shader index of the attribute
         * @param size - The number of bytes for this attribute
         */
        addAttribute: function(location, size)
        {
            this.attributeLocations.push(location);

            this.attributeSizes.push(size);

            this.attributeOffsets.push(this.strideSize);

            this.strideSize += (size * 4);

            this.sizeOfVertex += size;
        }
    };

    window.MeshFamily = MeshFamily;

})(window);