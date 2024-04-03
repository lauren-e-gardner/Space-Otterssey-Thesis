uniform float uTime;

varying float vDisplacement;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// vec4(0.9*vDisplacement, 0.9 - 0.2 * vDisplacement, 0.9 - 0.1 * vDisplacement, 1.0)
	gl_FragColor = vec4(vec3(0.1, 0.7*vDisplacement, 0.4), 1);
}
