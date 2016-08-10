/**
 * Created by wpger_000 on 8/5/2016.
 */

(function(window) {
    'use strict';

    var RenderMesh = function(glContext, vertices, normals, indices, shaderProgram, modelUniformName, vertexAttributeName, normalAttributeName) {
        //  OBJ.initMeshBuffers(glContext, this.mesh);
        var builder = new GeometryBuilder();
        builder.createComponent(0, 3);
        builder.createComponent(1, 3);
        builder.setDataAtComponent(0, vertices);
        builder.setDataAtComponent(1, normals);
        builder.setIndices(indices);

        this.geometry = builder.build();
        this.vertexBuffer = new VBO(glContext);

        this.vertexBuffer.bind()
        this.vertexBuffer.initializeEmpty(this.geometry.vertexData.length * 4, glContext.STATIC_DRAW);
        this.vertexBuffer.bufferSubData(0, this.geometry.vertexData);

        this.indexBuffer = new IBO(glContext, glContext.UNSIGNED_INT);
        this.indexBuffer.bind();
        this.indexBuffer.initializeEmpty(this.geometry.indices.length, glContext.STATIC_DRAW);
        this.indexBuffer.bufferSubData(0, this.geometry.indices);

        this.indexBufferSize = this.geometry.indices.length;
        
        //  Find attributes required for the shader
        this.setShader(glContext, shaderProgram, modelUniformName, vertexAttributeName, normalAttributeName);

        this.modelMatrix = mat4.create();
        this.position = vec3.create();
        this.scale = [1, 1, 1];
    };

    RenderMesh.prototype = {

        constructor: RenderMesh,

        bind: function(glContext) {
            //  Bind the vertices
            this.vertexBuffer.bind();

            //  Bind the indices
            this.indexBuffer.bind();

            glContext.vertexAttribPointer(this.positionAttributeLocation, 3, glContext.FLOAT, false, 24, 0);

            glContext.vertexAttribPointer(this.normalAttributeLocation, 3, glContext.FLOAT, false, 24, 12);

        },
        render: function(glContext) {
            glContext.uniformMatrix4fv(this.modelUniformLocation, false, this.modelMatrix);

            glContext.drawElements(glContext.TRIANGLES, this.indexBufferSize, glContext.UNSIGNED_INT, 0);
        },
        setShader: function(glContext, shaderProgram, modelUniformName, vertexAttributeName, normalAttributeName) {
            this.modelUniformLocation = shaderProgram.getUniformLocation(modelUniformName);
            this.positionAttributeLocation = shaderProgram.getAttributeLocation(vertexAttributeName);
            this.normalAttributeLocation = shaderProgram.getAttributeLocation(normalAttributeName);
        },
        translate: function(x, y, z) {
            vec3.add(this.position, this.position, [x, y, z]);
            this.updateModel();
        },
        setTranslation: function(x, y, z) {
            this.position = [x, y, z];
            this.updateModel();
        },
        setScale: function(x, y, z) {
            this.scale = [x, y, z];
            this.updateModel();
        },
        updateModel: function() {
            mat4.identity(this.modelMatrix);
            mat4.translate(this.modelMatrix, this.modelMatrix, this.position);
            mat4.scale(this.modelMatrix, this.modelMatrix, this.scale);
        }
    };

    window.RenderMesh = RenderMesh;

})(window);