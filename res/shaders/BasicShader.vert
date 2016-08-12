

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec4 pass_color;
varying vec3 pass_normal;
varying vec3 pass_lightDirection;
varying highp vec2 vTextureCoord;


void main(void)
{
    vec3 normal = aVertexNormal;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    pass_lightDirection = vec3(1, 0, 0);
    pass_color = vec4(0.3, 0.8, 0.2, 1.0);

    pass_normal = aVertexNormal;
    vTextureCoord = aTextureCoord;
}