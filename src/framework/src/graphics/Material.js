/**
 * Created by wpger_000 on 8/5/2016.
 */

(function (window)
{
    'use strict';

    var uniqueId = 0;

    var Material = function (gl, shader, texture, modelUniformName, projectionUniformName, viewUniformName, samplerUniformName)
    {
        this.gl = gl;

        this.uniqueId = uniqueId++;

        this.shader = shader;

        this.texture = texture;

        this.modelMatrixUniform = this.shader.getUniformLocation(modelUniformName);

        this.projectionMatrixUniform = this.shader.getUniformLocation(projectionUniformName);

        this.viewMatrixUniform = this.shader.getUniformLocation(viewUniformName);

        this.samplerUnoform = this.shader.getUniformLocation(samplerUniformName);
    };

    Material.prototype = {

        constructor : Material,

        use : function (view, projection)
        {
            this.shader.bind();

            this.texture.bind();

            this.gl.uniformMatrix4fv(this.viewMatrixUniform, false, view);

            this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, projection);

            this.gl.uniform1i(this.samplerUnoform, 0);
        },

        unbind : function ()
        {
            this.texture.unbind();

            this.shader.unbind();
        }
    };

    window.Material = Material;

})(window);