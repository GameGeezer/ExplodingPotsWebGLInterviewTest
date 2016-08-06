/*
    TODO delete vertex and fragment handles
 */
(function(window) {
    'use strict';

    var ShaderProgram = function(glContext, vertexShaderId, fragmentShaderId) {

        this.shaderProgram = glContext.createProgram();
        var vertexShaderSource = this.loadSourceFromId(vertexShaderId);
        var fragmentShaderSource = this.loadSourceFromId(fragmentShaderId);
        var vertexShader = this.loadShader(glContext, vertexShaderSource, glContext.VERTEX_SHADER);
        var fragmentShader = this.loadShader(glContext, fragmentShaderSource, glContext.FRAGMENT_SHADER);
        glContext.attachShader(this.shaderProgram , vertexShader);
        glContext.attachShader(this.shaderProgram , fragmentShader);
        glContext.linkProgram(this.shaderProgram);

        if (!glContext.getProgramParameter(this.shaderProgram, glContext.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
    };

    ShaderProgram.prototype = {

        constructor: ShaderProgram,

        bind: function(glContext) {
            glContext.useProgram(this.shaderProgram);
        },
        unbind: function(glContext) {
          //  glContext.useProgram(0);
        },
        getUniformLocation: function(glContext, uniformName) {

            return glContext.getUniformLocation(this.shaderProgram , uniformName);
        },
        getAttributeLocation: function(glContext, attributeName) {
            var attributeLocation = glContext.getAttribLocation(this.shaderProgram , attributeName);
            glContext.enableVertexAttribArray(attributeLocation);

            return attributeLocation;
        },
        loadSourceFromId: function(id) {
            var shaderScript = document.getElementById(id);
            if (!shaderScript) {
                return null;
            }

            var str = "";
            var k = shaderScript.firstChild;
            while (k) {
                if (k.nodeType == 3)
                    str += k.textContent;
                k = k.nextSibling;
            }

            return str;
        },
        loadShader: function(glContext, shaderSource, shaderType) {

            var shader = glContext.createShader(shaderType);

            glContext.shaderSource(shader, shaderSource);
            glContext.compileShader(shader);

            if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
                alert(glContext.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        }
    };

    window.ShaderProgram = ShaderProgram;

})(window);
