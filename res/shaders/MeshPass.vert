attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

varying vec4 vColor;
varying vec3 vNormal;
varying highp vec2 vTextureCoord;
varying vec3 vPosition;


void main(void)
{
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);

    vNormal =  aVertexNormal; //uNormalMatrix * aVertexNormal;

    vTextureCoord = aTextureCoord;


    vPosition = gl_Position.xyz;

    vColor = vec4(0.3, 0.8, 0.2, 1.0);
}