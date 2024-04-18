import {
    Scene,
    Color,
} from 'three';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { BoxGeometry, MeshPhongMaterial, Mesh, Audio, AudioListener, AudioLoader, Clock} from 'three';
import { Land, Otter, Text, Otter_Cam, Fruit, Grape, Fruit2, Plant} from 'objects';
import { BasicLights } from 'lights';
import { Scenes } from '.';
import { Fonts } from 'objects';

class Planet_Seed extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();
        this.time = new Clock(true);
        

        // Init state
        this.state = {
            updateList: [],
        };
        this.background = new Color( 0x4f4f4f );

        let otter_cam = new Otter_Cam(this)
        this.camera = otter_cam.camera
        this.init()
       
        // -------- ADDING MESHES --------- //
        const land = new Land (0, 0, 0);
        const lights = new BasicLights();
        const otter = new Otter(this);
        otter.scale.set(1.25,1.25,1.25)
        this.addToUpdateList(land)
        this.otter = otter
        this.score = 0

        
        let posXs = []
        let posZs = []
        let count = 0
        while(count < 27){
            const posX = Math.floor(Math.random() * 50) - 25;
            const posZ =  Math.floor(Math.random() * 50 - 25);
            if(posXs.indexOf(posX) == -1 && posZs.indexOf(posZ) == -1){
                posXs.push(posX)
                posZs.push(posZ)
                count++
            }
        }

        let poison = []
        let counter = 0
        for (let i = 0; i < 7; i++){
            const plant = new Plant(this);
            plant.scale.set(0.35, 0.35, 0.35);
            plant.position.set(posXs[counter], 0.0, posZs[counter])
            poison.push(plant)
            this.add(plant)
            counter++
        }

        let all_items = []

        for (let i = 0; i < 7; i++){
            const fruit = new Fruit(this);
            fruit.scale.set(0.3, 0.3, 0.3);
            fruit.position.set(posXs[counter], 0.0, posZs[counter])

            all_items.push(fruit)
            this.add(fruit)
            counter++
        }
        for (let i = 0; i < 6; i++){
            const fruit = new Grape(this);
            fruit.scale.set(0.25, 0.25, 0.25);
            fruit.position.set(posXs[counter], 0.0, posZs[counter])
            all_items.push(fruit)
            this.add(fruit)
            counter++
        }
        for (let i = 0; i < 7; i++){
            const fruit = new Fruit2(this);
            fruit.scale.set(0.25, 0.25, 0.25);
            fruit.position.set(posXs[counter], 0.0, posZs[counter])
            all_items.push(fruit)
            this.add(fruit)
            counter++
        }
        
        this.camera.lookAt(otter.position);

        // this.genText();
        this.dead = false;
        this.time.start()
        this.onKeyDown = (event) => {

            if(!this.dead) {
                if (event.keyCode == 16) {
                    otter.state.speed = true
                    otter_cam.state.speed = true
                }
                if (event.keyCode == 37 || event.keyCode == 65) {
                    //    Left
                    otter.state.moveLeft = true;
                    otter_cam.state.moveLeft = true;

                    otter.state.moveRight = false;
                    otter_cam.state.moveRight = false;
                    otter.state.moveUp = false;
                    otter_cam.state.moveUp = false;
                    otter.state.moveDown = false;
                    otter_cam.state.moveDown = false;
                }

                if (event.keyCode == 38 || event.keyCode == 87) {
                    // Up
                    otter.state.moveUp = true;
                    otter_cam.state.moveUp = true;
                        
                    otter.state.moveRight = false;
                    otter_cam.state.moveRight = false;
                    otter.state.moveLeft = false;
                    otter_cam.state.moveLeft = false;
                    otter.state.moveDown = false;
                    otter_cam.state.moveDown = false;
                }

                if (event.keyCode == 39 || event.keyCode == 68) {
                    // Right
                    otter.state.moveRight = true;
                    otter_cam.state.moveRight = true;
                        
                    otter.state.moveLeft = false;
                    otter_cam.state.moveLeft = false;
                    otter.state.moveUp = false;
                    otter_cam.state.moveUp = false;
                    otter.state.moveDown = false;
                    otter_cam.state.moveDown = false;
                }

                if (event.keyCode == 40 || event.keyCode == 83) {
                    // Down
                    otter.state.moveDown = true;
                    otter_cam.state.moveDown = true;

                    otter.state.moveRight = false;
                    otter_cam.state.moveRight = false;
                    otter.state.moveUp = false;
                    otter_cam.state.moveUp = false;
                    otter.state.moveLeft = false;
                    otter_cam.state.moveLeft = false;
                }

                if (event.keyCode == 32 ) {
                    let found = false
                    for (let i = 0; i < poison.length; i++) { 
                        if(otter.position.distanceTo(poison[i].position) < 2.5) {
                            this.score = 0
                            this.genDead(otter.position, "You Are Dead!")
                        
                            this.remove(poison[i])
                            poison.splice(i,1)
                            this.dead = true;
                            otter.state.moveDown = false;
                            otter.state.moveUp = false;
                            otter.state.moveLeft = false;
                            otter.state.moveRight = false;
                            otter.state.speed = false;

                            otter_cam.state.moveDown = false;
                            otter_cam.state.moveUp = false;
                            otter_cam.state.moveLeft = false;
                            otter_cam.state.moveRight = false;
                            otter_cam.state.speed = false; 
                            otter.die()
                            otter.state.bob = false;
                            // otter.position = -20;
                            break
                        }
                    }
                    if (!this.dead){
                        for (let i = 0; i < all_items.length; i++) { 
                            if(otter.position.distanceTo(all_items[i].position) < 2.5) {
                                this.score++
                                this.genText(all_items[i].position, this.score)
                                this.remove(all_items[i])
                                all_items.splice(i,1)
                                otter.spin()
                                found = true;
                                break
                            }
                        }
                        if (all_items.length == 0) {
                           this.won(otter.position) 
                           for (let i = 0; i < 20; i++){
                                otter.spin()
                           }
                        }
                    }
                }
            }
            else {
                if (event.keyCode == 32 ){
                    // this.restart()
                    // this.dead = false
                    // otter.state.reset = true
                    // otter.state.bob = true
                    // otter_cam.state.reset = true
                    location.reload()
                }
            }
        }
        this.onKeyUp = (event) => {
            if (!this.dead){
                if(event.keyCode == 16) {
                    otter.state.speed = false
                    otter_cam.state.speed = false
                }
                if (event.keyCode == 37 || event.keyCode == 65) {
                        otter.state.moveLeft = false;
                        otter_cam.state.moveLeft = false;
                }
                if (event.keyCode == 38 || event.keyCode == 87) {
                        otter.state.moveUp = false;
                        otter_cam.state.moveUp = false;
                }
                if (event.keyCode == 39 || event.keyCode == 68) {
                        otter.state.moveRight = false;
                        otter_cam.state.moveRight = false;
                }
                if (event.keyCode == 40 || event.keyCode == 83) {
                        otter.state.moveDown = false;
                        otter_cam.state.moveDown = false;
                }
            }
            
        }
        this.add(land, lights, otter);
        // this.add(land, lights);
        // this.add(otter, lights)
    }

    init() {
     
        var string = "HOW TO PLAY\nUse 'WASD' or arrow keys to move\nPress SHIFT to sprint\nPress SPACE to collect fruit\nWarning: Be careful what you eat!";
        const loader = new FontLoader();
       
        loader.load(Fonts, function (font) {
            const textGeometry2 = new TextGeometry(string, {
                font: font,
                size: 0.3,
                height: 0,
            });
            Scenes.scenes['Planet_Seed'].textMesh = new Mesh(textGeometry2, new MeshPhongMaterial({color: 0xffffff}));
            Scenes.scenes['Planet_Seed'].add(Scenes.scenes['Planet_Seed'].textMesh);       
            Scenes.scenes['Planet_Seed'].textMesh.position.set(-3,5,3)
        });
    }

    restart(){
        this.remove(Scenes.scenes['Planet_Seed'].textMesh);
        this.remove(Scenes.scenes['Planet_Seed'].textMeshRestart);
    }

    genDead(pos, string){
        this.remove(Scenes.scenes['Planet_Seed'].textMesh);
        const loader = new FontLoader();
        loader.load(Fonts, function (font) {
            const textGeometry2 = new TextGeometry(string, {
                font: font,
                size: .75,
                height: 0,
            });
            Scenes.scenes['Planet_Seed'].textMesh = new Mesh(textGeometry2, new MeshPhongMaterial({color: 0xffffff}));
            //Scenes.scenes['TitleScene'].textMesh.position.set(grub_position.x, grub_position.y, grub_position.z + 0.2);
            Scenes.scenes['Planet_Seed'].add(Scenes.scenes['Planet_Seed'].textMesh);       
            Scenes.scenes['Planet_Seed'].textMesh.position.set(pos.x-2.75, pos.y+2, pos.z+2)
        });
        loader.load(Fonts, function (font) {
            const textGeometry2 = new TextGeometry('Press Space to retry', {
                font: font,
                size: .3,
                height: 0,
            });
            Scenes.scenes['Planet_Seed'].textMeshRestart = new Mesh(textGeometry2, new MeshPhongMaterial({color: 0xffffff}));
            //Scenes.scenes['TitleScene'].textMesh.position.set(grub_position.x, grub_position.y, grub_position.z + 0.2);
            Scenes.scenes['Planet_Seed'].add(Scenes.scenes['Planet_Seed'].textMeshRestart);       
            Scenes.scenes['Planet_Seed'].textMeshRestart.position.set(pos.x - 1.5, pos.y+2, pos.z + 3.0)
        });
    }

    genText(pos, score){
        this.remove(Scenes.scenes['Planet_Seed'].textMesh);
        const string = "Score: " + score;
        const loader = new FontLoader();
        // this.textMesh.remove;
        loader.load(Fonts, function (font) {
            const textGeometry2 = new TextGeometry(string, {
                font: font,
                size: 0.5,
                height: 0,
            });
            Scenes.scenes['Planet_Seed'].textMesh = new Mesh(textGeometry2, new MeshPhongMaterial({color: 0xffffff}));
            Scenes.scenes['Planet_Seed'].add(Scenes.scenes['Planet_Seed'].textMesh);       
            Scenes.scenes['Planet_Seed'].textMesh.position.set(pos.x, pos.y, pos.z)
        });
    }

    won(pos) {
        this.remove(Scenes.scenes['Planet_Seed'].textMesh); 
        const string = "You Won!\n Score: " + Math.floor(this.time.getElapsedTime()) + " Seconds";
        // const string = "You Won!";
        const loader = new FontLoader();
        loader.load(Fonts, function (font) {
            const textGeometry2 = new TextGeometry(string, {
                font: font,
                size: 0.5,
                height: 0,
            });
            Scenes.scenes['Planet_Seed'].textMesh = new Mesh(textGeometry2, new MeshPhongMaterial({color: 0xffffff}));
            Scenes.scenes['Planet_Seed'].add(Scenes.scenes['Planet_Seed'].textMesh);       
            Scenes.scenes['Planet_Seed'].textMesh.position.set(pos.x - 1.5, pos.y + 2, pos.z - 3.5)
        });
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        
        const { rotationSpeed, updateList } = this.state;

        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        
    }

    addEvents() {
        // Resize Handler
        // this.windowResizeHandler();
        window.addEventListener('resize', this.windowResizeHandler, false);
        window.addEventListener('keydown', this.onKeyDown, true);
        window.addEventListener('keyup', this.onKeyUp, true);
    }

    removeEvents() {
        window.removeEventListener('resize', this.windowResizeHandler, false);
        window.removeEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
    }

}

export default Planet_Seed;
