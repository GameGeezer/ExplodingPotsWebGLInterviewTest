  #extension GL_EXT_draw_buffers : require

  precision mediump float;

  varying vec4 vColor;
  varying vec3 vNormal;

  varying highp vec2 vTextureCoord;
  varying vec3 vPosition;

  uniform sampler2D uSampler;

  void main(void) {

    vec3 color = (texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).xyz);

    gl_FragData[0] = vec4(color, 1.0);
    gl_FragData[1] = vec4(vNormal, 1.0);
    gl_FragData[2] = vec4(vPosition, 1.0);
  }