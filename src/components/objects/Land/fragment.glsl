uniform sampler2D uTexture;
uniform float uTime;
uniform float uRadius;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;
// varying vec2 b;


void main() {
    // vec3 color = vec3(vDisplacement * 0.1 + 0.35) * vec3(0.2,0.9,0.4);
    // color = vDisplacement > -0.75 ? color:vec3(0.2,0.6,0.9);
    vec4 color = texture2D(uTexture, vUv)*0.8 + vec4(0.9*vDisplacement , 0.9 - 0.2 * vDisplacement , 0.9 - 0.1 * vDisplacement , 1.0) * 0.3;

    gl_FragColor = color;
    // vec4 color =vec4(0.1,0.9,0.8,0.9);
    // gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    // gl_FragColor = vec4(vec3(vPosition), 1);
    
}