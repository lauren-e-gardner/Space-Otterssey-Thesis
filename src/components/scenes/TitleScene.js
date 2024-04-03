import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {
    Scene,
    OrthographicCamera, 
} from 'three';
import { Title} from 'objects';
import { BasicLights } from 'lights';
import { Scenes } from '.';

class TitleScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: [],
        };

    
        this.nextScene = false;

        // -------- ADDING MESHES --------- //
        const title = new Title (0, 0, 0);
        const lights = new BasicLights();
        title.boundingBox = title.getBoundingBox()


        // camera
        this.camera = new OrthographicCamera(
            window.innerWidth / -110,
            window.innerWidth / 110,
            window.innerHeight / 110,
            window.innerHeight / -110,
            0,
            1000
        );
        // Set the initial position and orientation of the camera
        this.camera.position.set(0, 5, 14); // angled to like legend of zelda
        // can use lookAt to follow player position too
        this.camera.lookAt(0, 0, 0);

        this.windowResizeHandler = () => {
            const { innerHeight, innerWidth } = window;
            Scenes.renderer.setSize(innerWidth, innerHeight);
            this.camera.aspect = innerWidth / innerHeight;
            this.camera.updateProjectionMatrix();
        };


        // -------- SOUND CODE PT 1 START ---------- //
        // // create an AudioListener and add it to the camera
        // const listener = new AudioListener();
        // this.camera.add(listener);

        // // create a global audio source
        // const sound = new Audio(listener);
        // -------- SOUND CODE PT 1 END ---------- //

        // --- PLAYER MOVEMENT --- //
        //const playerSize = ;
        // const speed = 1;

    //     const loader = new FontLoader();
    //     this.textMesh;
    //   //  this.textMesh.position.set(0,-1,0)
    //     loader.load(PixelFont, function (font) {
    //         const textGeometry = new TextGeometry("Press space to continue", {
    //             font: font,
    //             size: 0.4,
    //             height: 0,
    //         });
    //         Scenes.scenes['TitleScene'].textMesh = new Mesh(textGeometry, new MeshPhongMaterial({color: 0xffffff}));
    //         //Scenes.scenes['TitleScene'].textMesh.position.set(grub_position.x, grub_position.y, grub_position.z + 0.2);
    //         Scenes.scenes['TitleScene'].add(Scenes.scenes['TitleScene'].textMesh);       
    //         Scenes.scenes['TitleScene'].textMesh.position.set(-3.5, -4, 0);
    //     });
      
        this.onKeyDown = (event) => {
// ----- SOUND PT 2 ----- //
    // load a sound and set it as the Audio object's buffer
    // chrome requires user input to start audio so need to be on a key pressed or smth
    // console.log(player_box.boundingBox.intersectsBox(holes[0].boundingBox))
    // const audioLoader = new AudioLoader();
    // // replace music
    // audioLoader.load(
    //     'src/sounds/dungeon.mp3',
    //     function (buffer) {
    //         sound.setBuffer(buffer);
    //         sound.setLoop(true);
    //         sound.setVolume(0.1);
    //         if (!sound.isPlaying) sound.play();
    //     }
    // );
    // ----- SOUND PT 2 ----- //


            // let happen = true;
            if (event.keyCode == 32) {
                // change scene
                this.nextScene = true;
                this.switchScene();
                //happen = false
               // event.end
            }

        }
        this.switchScene = (event) => {
            if (this.nextScene){
                console.log("switching")
                window.removeEventListener('keydown', this.onKeyDown, false);
                Scenes.switchScene('Planet_Seed');
            }
        }
            
        // ----------------------- //
        // -------- ADDING OBJECTS TO SCENE --------- //
        //   console.log("OBJECT 2" , player_box.boundingBox)
        this.add(title, lights);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
      
    }

    addEvents() {
        // Resize Handler
        this.windowResizeHandler();
        window.addEventListener('resize', this.windowResizeHandler, false);
        window.addEventListener('keydown', this.onKeyDown, true);
    }

    removeEvents() {
        window.removeEventListener('resize', this.windowResizeHandler, false);
        window.removeEventListener('keydown', this.onKeyDown, true);
    }
}


export default TitleScene;
