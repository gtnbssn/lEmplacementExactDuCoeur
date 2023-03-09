/* precision mediump float; */


varying vec2 vUv;
varying float vRandom;
varying float vElevation;

void main()
{
  // pattern 7 - this is good
  float strength = mod(vUv.y * 10.0, 1.0);

  gl_FragColor = vec4(strength * vUv.x, strength * vUv.y, strength, 1.0);
}
