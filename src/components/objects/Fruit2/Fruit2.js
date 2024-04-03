import * as THREE from 'three';
import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import fragment from './fragment_fruit.glsl'
import vertex from './vertex_fruit.glsl'
import MODEL from './scene.gltf';

class Fruit2 extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        // Init state

        super();
        // Init state
        this.state = {
            bob: true,
            morph: true,
        };
        const loader = new GLTFLoader();
        
        // loading leaf geometry
        loader.load(MODEL, (gltf) => {
            gltf.scene.rotation.set(.5,-.5,.5)
            gltf.scene.position.y = 2.75
            gltf.scene.position.x = -.5
            gltf.scene.position.z = 0.75
            
            this.add(gltf.scene)
        });
        
        // loading shader code
        const geometry = new THREE.IcosahedronGeometry(1, 100)
        // const box_geo = new THREE.IcosahedronGeometry(2, 10)
        // const object = new THREE.Mesh( box_geo, new THREE.MeshBasicMaterial( 0xff0000 ) );
        let material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
        })
        this.material = material

        material.uniforms.uTime = {value: 0}
        material.uniforms.uRadius = {value : 0.5}

        this.mesh = new Mesh(geometry, material);

        
        // add fruit
        this.add(this.mesh);
        // add box (comment out to remove visualization)
        // this.add(helper);
        
       parent.addToUpdateList(this);
       
    }


    update(timeStamp) {
        // this.bounds.position.set(this.position)

        if (this.state.bob) {
            // Bob back and forth
            this.position.y = 0.05 * Math.cos(timeStamp / 200);
        }
        if (this.state.morph) {
            // Bob back and forth
            this.material.uniforms.uTime.value = timeStamp/2000
        }
        // this.helper.update()

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Fruit2;
