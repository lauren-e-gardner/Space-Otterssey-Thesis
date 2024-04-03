import * as THREE from 'three';
import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
// import MODEL from './otter_final.gltf';
import MODEL from './otter_animate.gltf';

class Otter extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        // Init state

        super();
        // Init state
        this.state = {
            bob: true,
            moveLeft: false,
            moveUp: false,
            moveRight: false,
            moveDown: false,
            twirl: false,
            speed: false,
            turn: false,
            reset: false,
        };


        // Load object
        const loader = new GLTFLoader();
        let otter
        this.name = 'otter';
        let model;
        otter = loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(0.1, 0.1, 0.1);
            this.add(gltf.scene);
            model = gltf.scene;

            // let skeleton = new THREE.SkeletonHelper( model );
            // skeleton.visible = true;
            // this.add( skeleton );

            // const animations = gltf.animations;

            // let mixer = new THREE.AnimationMixer( model );

            // let idleAction = mixer.clipAction( animations[ 0 ] );

            // idleAction.enabled = true;
            
        });


        //SMOKE
        let geometry = new THREE.SphereGeometry(0.7, 10, 10)
        let material = new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0xbbbfbc,
            opacity: 0.5
        })
        let blobs = []
        for (let i = 0; i < 10; i++) {
            let blob = new THREE.Mesh(geometry, material)
      
            blob.position.x = -Math.random() * 0.25 + Math.random() *0.25
            blob.position.z = -Math.random() * 0.25 + Math.random() * 0.25 -1.9
            blob.position.y = -Math.random() * 0.25 + Math.random() * 0.25 +0.8
            let blob_scale = Math.random() / 4.0
            blob.scale.set(blob_scale, blob_scale, blob_scale)
            if (i == 0) {
              // first blob acts as the movement guide of all subsequent blobs and it has a regular circular path
              // better to make it invisible because it's movement does not look random
              blob.visible = false
            }
            blobs.push(blob)
            this.add(blob)
          }
          this.blobs = blobs





        // var bbox = new THREE.Box3().setFromObject(this)
        // this.add(bbox)
       parent.addToUpdateList(this);
       
    }

    activateAllActions() {

        setWeight( idleAction, settings[ 'modify idle weight' ] );

        actions.forEach( function ( action ) {

            action.play();

        } );

    }

    spin() {
        // Add a simple twirl
        this.state.twirl += 4 * Math.PI;

        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: 0 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }
    die() {
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: -20 }, 900)
            .easing(TWEEN.Easing.Quadratic.In);
        jumpUp.onComplete(() => fallDown.start());
        jumpUp.start();
        this.position.y = -20
    }

    update(timeStamp) {
//          left:   from down   0
//          up:     from left   4.71238898038469
//          right:  from up     3.141592653589793
//          down:   from right  1.5707963267948966
//          left:   from down   0
      

        let speed = 0
        if (!this.state.speed) {
            speed = 0.15
        }
        else {
            speed = 0.3
        }

        if (this.state.bob) {
            // Bob back and forth
            this.rotation.z = speed * Math.sin(timeStamp / 300);
            this.rotation.x = speed * Math.cos(timeStamp / 200);
            this.position.y = speed * Math.sin(timeStamp / 150);
        }
        if (this.position.x >= 40) {
            this.state.moveRight = false;
        }
        if (this.position.x <= -40) {
            this.state.moveLeft = false;
        }
        if (this.position.z >= 40) {
            this.state.moveDown = false;
        }
        if (this.position.z <= -40) {
            this.state.moveUp = false;
        }

        if (this.state.moveLeft && !this.state.moveUp && !this.state.moveRight && !this.state.moveDown) {
            // left
                this.position.x -= speed;

                if (this.rotation.y != (270 * Math.PI) / 180.0 && this.state.twirl <= 0) {
                    this.rotation.y = (270 * Math.PI) / 180.0;
                }
        }
        if (!this.state.moveLeft && this.state.moveUp && !this.state.moveRight && !this.state.moveDown) {
            // up
            
                 this.position.z -= speed;
                if (this.rotation.y != (180 * Math.PI) / 180.0 && this.state.twirl <= 0) {
                    this.rotation.y = (180 * Math.PI) / 180.0;
                }
        }
        if (!this.state.moveLeft && !this.state.moveUp && this.state.moveRight && !this.state.moveDown) {
            // right
                this.position.x += speed;
                if (this.rotation.y != (90 * Math.PI) / 180.0 && this.state.twirl <= 0) {
                    this.rotation.y = (90 * Math.PI) / 180.0;
                }  
            
            
        }
        if (!this.state.moveLeft && !this.state.moveUp && !this.state.moveRight && this.state.moveDown) {
            // down
           
                this.position.z += speed;
                if (this.rotation.y != (0 * Math.PI) / 180.0 && this.state.twirl <= 0) {
                    this.rotation.y = (0 * Math.PI) / 180.0;
                }    
        }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            this.state.twirl -= Math.PI / 8;
            this.rotation.y += Math.PI / 8;
        }
        if (this.state.reset) {
            this.position.set(0,0,0)
            this.rotation.set(0,0,0)
            this.state.reset = false
        }

        //UPDATING SMOKE
        let first_obj = this.blobs[0]
        // to make the smoke follow our mouse, we need to transform the mouse's screen coordiantes into world space coordinates
        let offset = {
            x: 0,
            y: 0.8,
            z: -1.9,
          }
        first_obj.position.set(
            offset.x + Math.sin(timeStamp * 2.0),
            offset.y + Math.cos(timeStamp * 2.0),
            offset.z + Math.cos(timeStamp * 3.0)
          )
          for (let i = 0, l = this.blobs.length; i < l; i++) {
            var object = this.blobs[i]
            var object_left = this.blobs[i - 1]
            if (i >= 1) {
              // position of each blob is calculated by the cos/sin function of its previous blob's slightly scaled up position
              // such that each blob is has x, y and z coordinates inside -1 and 1, while a pseudo-randomness of positions is achieved
              // adding in the offset in case the 'followMouse' is toggled on (it is {x: 0, y: 0} when 'followMouse' is off)
              // here I'm using the built-in lerp function with a small enough interpolation factor which is just right to help produce the pseudo-randomness
              // it involves a bit of experimentation to get the feel right
              object.position.lerp(
                new THREE.Vector3(
                  offset.x + Math.sin(object_left.position.x * 4)/2.0,
                  offset.y + Math.sin(object_left.position.y * 4)/9.0,
                  offset.z + Math.cos(object_left.position.z * 4)/1.5,
                ), 0.05
              )
              object.rotateY( Math.PI / 2)
            //   object.rotateX( Math.PI / 4)
            }
          }
       
        // this.helper.update()
        TWEEN.update();
    }
}

export default Otter;
