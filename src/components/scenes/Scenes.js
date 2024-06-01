import { WebGLRenderer} from 'three';
import Planet_Seed from './Planet_Seed';


class Scenes {
    constructor(){
        this.scenes = {};
        this.currentScene = undefined;
        this.renderer = undefined;
    }

    create(){
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.scenes['Planet_Seed'] = new Planet_Seed();
 
        this.currentScene = this.scenes['Planet_Seed'];
        this.currentScene.addEvents();
        console.log(this.scenes)
    }

    switchScene(sceneKey) {
        this.currentScene.removeEvents();
        this.currentScene = this.scenes[sceneKey];
        this.currentScene.addEvents();
    }
}

const instance = new Scenes();

export default instance;