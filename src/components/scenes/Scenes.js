import { WebGLRenderer} from 'three';
import Planet_Seed from './Planet_Seed';
import TitleScene from './TitleScene';

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
        // this.scenes['Intro'] = new Intro();
        // this.scenes['SeedScene'] = new SeedScene();
        // this.scenes['SeedSceneTwo'] = new SeedSceneTwo();
        // this.scenes['SeedSceneThree'] = new SeedSceneThree();
        // this.scenes['TransitionOne'] = new TransitionOne();
        // this.scenes['TransitionTwo'] = new TransitionTwo();
        this.scenes['TitleScene'] = new TitleScene();
        // this.scenes['End'] = new End();



        // this.currentScene = this.scenes['TitleScene'];
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