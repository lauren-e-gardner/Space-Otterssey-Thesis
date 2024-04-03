import * as THREE from 'three';
import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import fragment from './fragment_fruit.glsl'
import vertex from './vertex_fruit.glsl'
import MODEL from './scene.gltf';

class Grape extends Group {
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
        const geometry = new THREE.IcosahedronGeometry(0.01, 5)

        let material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
        })
        this.material = material

        material.uniforms.uTime = {value: 0}
        material.uniforms.uRadius = {value : 0.5}

        let mesh1 = new Mesh(geometry, material);
        let mesh2 = new Mesh(geometry, material);
        let mesh3 = new Mesh(geometry, material);
        let mesh4 = new Mesh(geometry, material);
        let mesh5 = new Mesh(geometry, material);
        let mesh6 = new Mesh(geometry, material);
        let mesh7 = new Mesh(geometry, material);
        let mesh8 = new Mesh(geometry, material);
        let mesh9 = new Mesh(geometry, material);
        let mesh10 = new Mesh(geometry, material);

        mesh1.position.set(-2,0,0) //row 1
        mesh2.position.set(0,-2.5,0) //bottom
        mesh3.position.set(0,0,-2) //row 1
        mesh4.position.set(2,0,0) //row 1
        mesh5.position.set(0,1.0,0) //top
        mesh5.scale.set(1.3,1.3,1.3)
        mesh6.position.set(0,0,2) //row 1

        mesh7.position.set(1.25,-1.25,1.25) //row 2
        mesh8.position.set(-1.25,-1.25,1.25) //row 2
        mesh9.position.set(1.25,-1.25,-1.25) //row 2
        mesh10.position.set(-1.25,-1.25,-1.25) //row 2

        // bottom / top
        mesh2.rotation.x = Math.PI/2
        mesh5.rotation.x = Math.PI/2

        // row 1
        mesh1.rotateY(Math.PI/2) 
        mesh1.rotateX(Math.PI/8)
        mesh4.rotateY(Math.PI/2) 
        mesh4.rotateX(-Math.PI/8)
        // mesh1.rotation.set(0,Math.PI/2,0)
        mesh3.rotation.set(Math.PI/8,0,0)
        mesh6.rotation.set(-Math.PI/8,0,0)

        // row 2
        mesh7.rotation.set(0,Math.PI/4,0)
        mesh8.rotation.set(0,-Math.PI/4,0)
        mesh9.rotation.set(0,-Math.PI/4,0)
        mesh10.rotation.set(0,Math.PI/4,0)
        

        this.add(mesh1)
        this.add(mesh2)
        this.add(mesh3)
        this.add(mesh4)
        this.add(mesh5)
        this.add(mesh6)
        this.add(mesh7)
        this.add(mesh8)
        this.add(mesh9)
        this.add(mesh10)


        
        // add fruit
        // this.add(this.mesh);
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

export default Grape;
