uniform float uTime;

varying float vDisplacement;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// gl_FragColor = vec4(vec3(0.6 - 0.2 * vDisplacement, 0.2* vDisplacement, 0.6*vDisplacement), 1);
	// gl_FragColor = vec4(vec3(0.0, 0.9 - 0.35 * vDisplacement, 0.7*vDisplacement), 1);
    gl_FragColor = vec4(vec3(0.73, 0.75, 0.73)* vDisplacement, 1.0);
}
