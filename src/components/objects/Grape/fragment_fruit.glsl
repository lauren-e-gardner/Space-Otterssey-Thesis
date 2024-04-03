uniform float uTime;

varying float vDisplacement;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	gl_FragColor = vec4(vec3(0.4*vDisplacement, 0.2, 0.9 - 0.2 *vDisplacement)*vDisplacement, 1);
}
