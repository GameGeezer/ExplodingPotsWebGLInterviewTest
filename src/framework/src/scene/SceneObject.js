(function (window)
{
    'use strict';

    var SceneObject = function (gl, mesh, material)
    {
        this.gl = gl;
        this.mesh = mesh;
        this.material = material;

        this.translation = vec3.create();
        this.scale = vec3.create();
        vec3.set(this.scale, 1, 1, 1);
        this.modelMatrix = mat4.create();

        this.updateModel();
    };

    SceneObject.prototype = {

        constructor : SceneObject,

        render : function ()
        {
            this.gl.uniformMatrix4fv(this.material.modelMatrixUniform, false, this.modelMatrix);

            this.mesh.render();
        },

        translateBy : function (x, y, z)
        {
            this.translation[0] += x;
            this.translation[1] += y;
            this.translation[2] += z;

            this.updateModel();
        },

        scaleBy : function (x, y, z)
        {
            this.scale[0] += x;
            this.scale[1] += y;
            this.scale[2] += z;

            this.updateModel();
        },

        setScale : function (x, y, z)
        {
            this.scale[0] = x;
            this.scale[1] = y;
            this.scale[2] = z;

            this.updateModel();
        },

        updateModel : function()
        {
            mat4.identity(this.modelMatrix);
            mat4.translate(this.modelMatrix, this.modelMatrix, this.translation);
            mat4.scale(this.modelMatrix, this.modelMatrix, this.scale);
        }
    };

    window.SceneObject = SceneObject;

})(window);