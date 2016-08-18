/**
 * Created by wpger_000 on 8/5/2016.
 */

(function (window)
{
    'use strict';

    var uniqueId = 0;

    var Material = function (gl, shader,modelUniformName, projectionUniformName, viewUniformName, samplerUniformName, normalMatrixUniformName)
    {
        this.gl = gl;

        this.uniqueId = uniqueId++;

        this.textures = [];

        this.shader = shader;

        this.modelMatrixUniform = this.shader.getUniformLocation(modelUniformName);

        this.projectionMatrixUniform = this.shader.getUniformLocation(projectionUniformName);

        this.viewMatrixUniform = this.shader.getUniformLocation(viewUniformName);

        this.samplerUnoform = this.shader.getUniformLocation(samplerUniformName);

        this.normalMatrixUniform = this.shader.getUniformLocation(normalMatrixUniformName);
    };

    Material.prototype = {

        constructor : Material,

        use : function (view, projection)
        {
            this.shader.bind();

            for(var i = 0; i < this.textures.length; ++i)
            {
                this.gl.activeTexture(this.gl.TEXTURE0 + i);

                this.textures[i].bind();
            }

            this.gl.uniform1i(this.samplerUnoform, 0);

            this.gl.uniformMatrix4fv(this.viewMatrixUniform, false, view);

            this.gl.uniformMatrix4fv(this.projectionMatrixUniform, false, projection);


        },

        unbind : function ()
        {
            for(var i = 0; i < this.textures.length; ++i)
            {
                this.textures[i].unbind();
            }

            this.shader.unbind();
        },

        addTexture: function(texture)
        {
            this.textures.push(texture);
        }
    };

    window.Material = Material;

})(window);