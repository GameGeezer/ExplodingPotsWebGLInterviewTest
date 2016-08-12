attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;

void main(void)
{
    gl_Position = uModelMatrix * uViewMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
}