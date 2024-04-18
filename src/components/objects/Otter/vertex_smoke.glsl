uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;

/* 
* SMOOTH MOD
* - authored by @charstiles -
* based on https://math.stackexchange.com/questions/2491494/does-there-exist-a-smooth-approximation-of-x-bmod-y
* (axis) input axis to modify
* (amp) amplitude of each edge/tip
* (rad) radius of each edge/tip
* returns => smooth edges
*/
#define PI 3.1415926535897932384626433832795

float smoothMod(float axis, float amp, float rad){
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
  return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
}

float waveY(vec3 position) {
  return fit(smoothMod(position.y * 2.0, 1.5, 0.75), 0.35, 0.6, 0.0, 0.9);
}
float waveX(vec3 position) {
  return fit(smoothMod(position.x * 2.0, 1.5, 2.0), 0.35, 0.6, 0.0, 0.9);
}
float waveZ(vec3 position) {
  return fit(smoothMod(position.z * 2.0, 1.5, 2.0), 0.35, 0.6, 0.0, 0.9);
}
 
void main() {
    // varyings
    vPosition = position;
    vNormal = normal;
    vUv = uv;
    vec3 coords = normal;
    coords.z += uTime;
    float pattern = waveZ(coords);
    vDisplacement = pattern;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

	// gl_Position = vec4(vPosition);
}