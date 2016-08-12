  precision mediump float;
  varying vec4 pass_color;
  varying vec3 pass_normal;
  varying vec3 pass_lightDirection;

  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main(void) {
    	float lambertCoef = max(dot(pass_normal, pass_lightDirection), 0.0);

    vec3 diffuse      = vec3(0.9, 0.9, 0.9);
    vec3 ambientColor = vec3(0.4, 0.4, 0.4);

    vec3 lightWeighting = ambientColor + diffuse * lambertCoef;

    vec3 color = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).xyz * lightWeighting;

    gl_FragColor = vec4(color, 1.0);
  }