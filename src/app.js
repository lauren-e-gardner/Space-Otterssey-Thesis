import { WebGLRenderer, OrthographicCamera, TextGeometry, FontLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

require('./sounds/dungeon.mp3');
require('./sounds/Old Nassau - 2020 Virtual Commencement.mp3');
// const io = require('socket.io')(http)

import { Scenes } from 'scenes';
Scenes.create();
// io.on("connection", function(socket){
//     console.log('A user connected')
// })

// // Initialize core ThreeJS components
// const scene = new SeedScene();
// //const camera = new PerspectiveCamera();
let pixelRatio = window.devicePixelRatio
let AA = true
if (pixelRatio > 1) {
  AA = false
}

const renderer = new WebGLRenderer({ powerPreference: "high-performance", antialias: AA });

//makes the camera top down (Orthographic Camera)

    // camera
let camera = new OrthographicCamera(
        window.innerWidth / -150,
        window.innerWidth / 150,
        window.innerHeight / 150,
        window.innerHeight / -150,
        0,
        1000
    );
camera.position.set(0, 30, 50);
camera.lookAt(0, 0, 0);

Scenes.renderer.setPixelRatio(window.devicePixelRatio);
const canvas = Scenes.renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);


//Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    Scenes.renderer.render(Scenes.currentScene, Scenes.currentScene.camera);
    // Scenes.renderer.render(Scenes.currentScene, camera);
    // Scenes.currentScene.textMesh = ''
    Scenes.currentScene.update && Scenes.currentScene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

