/**
 * Created by wpger_000 on 8/5/2016.
 */

(function(window) {
    'use strict';

    var RenderMesh = function(glContext, mesh, shaderProgram, modelUniformName, vertexAttributeName, normalAttributeName) {
        // Load the mesh and initialize the buffers
        this.mesh = mesh;
        OBJ.initMeshBuffers(glContext, this.mesh);
        this.vertexBuffer = this.mesh.vertexBuffer;
        this.vertexBufferSize = this.mesh.vertexBuffer.itemSize;
        this.normalBuffer = this.mesh.normalBuffer;
        this.normalBufferSize = this.mesh.normalBuffer.itemSize;
        this.indexBuffer = this.mesh.indexBuffer;
        this.indexBufferSize = this.mesh.indexBuffer.numItems;


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
            glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
            glContext.vertexAttribPointer(this.positionAttributeLocation, this.vertexBufferSize, glContext.FLOAT, false, 0, 0);
            //  Bind the normals
            glContext.bindBuffer(glContext.ARRAY_BUFFER, this.normalBuffer);
            glContext.vertexAttribPointer(this.normalAttributeLocation, this.normalBufferSize, glContext.FLOAT, false, 0, 0);
            //  Bind the indices
            glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        },
        render: function(glContext) {
            glContext.uniformMatrix4fv(this.modelUniformLocation, false, this.modelMatrix);

            glContext.drawElements(glContext.TRIANGLES, this.indexBufferSize, glContext.UNSIGNED_SHORT, 0);
        },
        setShader: function(glContext, shaderProgram, modelUniformName, vertexAttributeName, normalAttributeName) {
            this.modelUniformLocation = shaderProgram.getUniformLocation(glContext, modelUniformName);
            this.positionAttributeLocation = shaderProgram.getAttributeLocation(glContext, vertexAttributeName);
            this.normalAttributeLocation = shaderProgram.getAttributeLocation(glContext, normalAttributeName);
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