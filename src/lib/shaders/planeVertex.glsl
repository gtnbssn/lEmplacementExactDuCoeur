uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying vec2 vUv;
varying float vRandom;
varying float vElevation;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = aRandom * 0.04;
  elevation += sin(modelPosition.x * uFrequency.x + uTime) * 0.5;
  elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.5;
  modelPosition.z += elevation;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;

  vUv = uv;
  vRandom = aRandom;
  vElevation = elevation;
}
