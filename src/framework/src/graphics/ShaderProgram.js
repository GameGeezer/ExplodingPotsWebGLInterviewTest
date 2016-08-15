(function (window)
{
    'use strict';

    var ShaderProgram = function (gl, vertexShaderSource, fragmentShaderSource)
    {
        this.gl = gl;

        this.shaderProgram = this.gl.createProgram();

        //  Compile the shaders
        var vertexShader = this.loadShader(vertexShaderSource, this.gl.VERTEX_SHADER);

        var fragmentShader = this.loadShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);

        //  Attach the shaders to the program
        this.gl.attachShader(this.shaderProgram, vertexShader);

        this.gl.attachShader(this.shaderProgram, fragmentShader);

        this.gl.linkProgram(this.shaderProgram);

        //  Throw an exception if the program fails to link
        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS))
        {
            throw new Exception("Could not initialise shaders");
        }
    };

    ShaderProgram.prototype = {

        constructor : ShaderProgram,

        bind : function ()
        {
            this.gl.useProgram(this.shaderProgram);
        },

        unbind : function ()
        {
            this.gl.useProgram(null);
        },

        getUniformLocation : function (uniformName)
        {
            return this.gl.getUniformLocation(this.shaderProgram, uniformName);
        },

        getAttributeLocation : function (attributeName)
        {
            var attributeLocation = this.gl.getAttribLocation(this.shaderProgram, attributeName);

            this.gl.enableVertexAttribArray(attributeLocation);

            return attributeLocation;
        },

        loadShader : function (shaderSource, shaderType)
        {
            //  Create shader of type, i.e vertex, fragment
            var shader = this.gl.createShader(shaderType);

            //  Link the source code for the shader
            this.gl.shaderSource(shader, shaderSource);

            //  Compile the linked source
            this.gl.compileShader(shader);

            //  Throw an exception if the shader fails to compile
            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
            {
                throw new Exception(this.gl.getShaderInfoLog(shader));
            }

            return shader;
        }
    };

    window.ShaderProgram = ShaderProgram;

})(window);
