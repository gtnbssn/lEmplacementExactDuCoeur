/* uniform mat4 projectionMatrix; */
/* uniform mat4 viewMatrix; */
/* uniform mat4 modelMatrix; */
/* attribute vec3 position; */
/* attribute vec2 uv; */
uniform vec2 uFrequency;
uniform float uTime;

// attribute float aRandom;

varying vec2 vUv;
varying float  vElevation;

// Simplex 2D noise, from https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83#simplex-noise

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = snoise(vec2(modelPosition.x * 0.5, modelPosition.z * 0.45))
    * snoise(vec2(uv.x * 0.1 + sin(uTime * 0.12), uv.y * 2. + cos(uTime * 0.14)))
    * 0.5;
  /* float elevation = aRandom * 0.04;
  elevation += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
  modelPosition.z += elevation; */
  modelPosition.y += elevation;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;

  vUv = uv;
  /* vRandom = aRandom; */
  vElevation = (elevation + 0.5) * 1.;
}
