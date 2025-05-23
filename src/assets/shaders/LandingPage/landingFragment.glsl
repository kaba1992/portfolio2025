varying vec2 vUvs;
uniform sampler2D uTexture;
uniform sampler2D uCanvasTexture;
uniform float uOpacity; 


void main() {
  vec3 color = texture2D(uTexture, vUvs).rgb;
  vec3 uCanvasTextureColor = texture2D(uCanvasTexture, vUvs).rgb;
  float opacity = smoothstep(0.0, 1., uCanvasTextureColor.r) * uOpacity;
  gl_FragColor = vec4(color, opacity);

}
