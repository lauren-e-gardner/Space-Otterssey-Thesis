import * as THREE from 'three';
import { Group } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Otter_Cam extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        // Init state

        super();
        // Init state
        this.state = {
            moveLeft: false,
            moveUp: false,
            moveRight: false,
            moveDown: false,
            speed: false,
            reset: false,
        };
        
        this.camera = new THREE.OrthographicCamera(
            window.innerWidth / -150,
            window.innerWidth / 150,
            window.innerHeight / 150,
            window.innerHeight / -150,
            0,
            1000
        );
        this.camera.position.set(0, 30, 50);
       parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if (this.camera.position.x >= 40) {
            this.state.moveRight = false;
        }
        if (this.camera.position.x <= -40) {
            this.state.moveLeft = false;
        }
        if (this.camera.position.z >= 50+40) {
            this.state.moveDown = false;
        }
        if (this.camera.position.z <= 50-40) {
            this.state.moveUp = false;
        }

        let speed = 0
        if (!this.state.speed) {
            speed = 0.15
        }
        else {
            speed = 0.3
        }

        if (this.state.moveLeft && !this.state.moveUp && !this.state.moveRight && !this.state.moveDown) {
            this.camera.position.x -= speed;
        }
        if (!this.state.moveLeft && this.state.moveUp && !this.state.moveRight && !this.state.moveDown) {
            this.camera.position.z -= speed;
        }
        if (!this.state.moveLeft && !this.state.moveUp && this.state.moveRight && !this.state.moveDown) {
            this.camera.position.x += speed;
        }
        if (!this.state.moveLeft && !this.state.moveUp && !this.state.moveRight && this.state.moveDown) {
            this.camera.position.z += speed;
        }
        if (this.state.reset) {
            this.camera.position.set(0, 30, 50);
            this.state.reset = false
        }


        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Otter_Cam;
