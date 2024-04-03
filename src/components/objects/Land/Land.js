
require('./con.jpeg');
require('./gr.png');
require('./ground3.jpeg');
import * as THREE from 'three'
import {    Group, 
            PlaneGeometry, 
            TextureLoader,
            RepeatWrapping,
            sRGBEncoding,
            MeshBasicMaterial,
            DoubleSide,
            Mesh, 
            ShaderMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import MODEL from './land.gltf';
// import model from './con.jpeg'
// import model from './ground2.jpeg'
import fragment from './fragment.glsl'
import vertex from './vertex.glsl'
// import * from 'math'

class Land extends Group {
    constructor(x, y, z) {
        super()
        this.name = 'land'
        // const roomGeometry = new PlaneGeometry(
        //     20,
        //     14
        // );
        let groundTexture = new TextureLoader().load(
            'src/components/objects/Land/con.jpeg'
        );
        const plane = new THREE.PlaneGeometry(100, 150, 200, 200,)
        plane.rotateX((-90 * Math.PI) / 180.0)
        plane.translate(0.0, -7.0, 0.0)
        
        // ground texture
        groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
        groundTexture.repeat.set(10, 10);
        groundTexture.anisotropy = 16;
        groundTexture.encoding = sRGBEncoding;
        var material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
        })
        material.uniforms.uTime = {value: 0}
        material.uniforms.uTexture = {value: groundTexture}
        this.material = material
        
        this.room = new Mesh(plane, material);


        this.room.position.set(x, y, z);
        this.add(this.room);
        this.room.geometry.computeBoundingBox();
        this.room.boundingBox = this.room.geometry.boundingBox.clone();
    }


    getBoundingBox() {
        console.log(this.room.boundingBox)
        return this.room.boundingBox
    }
    update(timeStamp) {
      
        this.material.uniforms.uTime.value = timeStamp/1000

        // this.helper.update()

     
    }
}

export default Land;
