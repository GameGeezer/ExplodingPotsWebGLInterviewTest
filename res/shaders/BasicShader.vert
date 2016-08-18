

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vLightDirection;
varying highp vec2 vTextureCoord;
varying vec3 vPosition;


void main(void)
{
    mat4 mv =  uViewMatrix * uModelMatrix;

    vNormal =  aVertexNormal; //uNormalMatrix * aVertexNormal;

    vTextureCoord = aTextureCoord;

    gl_Position = uProjectionMatrix * mv * vec4(aVertexPosition, 1.0);

    vPosition = gl_Position.xyz;

    vLightDirection = vec3(1, 0, 0);
    vColor = vec4(0.3, 0.8, 0.2, 1.0);
}