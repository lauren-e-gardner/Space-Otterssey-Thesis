
//Put your textures here
require('./title.jpeg');
import { Group, PlaneGeometry, TextureLoader,RepeatWrapping,sRGBEncoding,MeshBasicMaterial,DoubleSide,Mesh} from 'three';


class Title extends Group {
    constructor(x, y, z) {
        super()
        this.name = 'title'
        const roomGeometry = new PlaneGeometry(
            20,
            14
        );
        const groundTexture = new TextureLoader().load(
            'src/components/objects/Title/title.jpeg'
        );

        
        // ground texture
        groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
        groundTexture.repeat.set(1, 1);
        groundTexture.anisotropy = 16;
        groundTexture.encoding = sRGBEncoding;
        var roomMaterial = new MeshBasicMaterial({
            map: groundTexture,
            side: DoubleSide,
        });
        
        this.room = new Mesh(roomGeometry, roomMaterial);
        this.room.position.set(x, y, z);
        this.add(this.room);
        this.room.geometry.computeBoundingBox();
        this.room.boundingBox = this.room.geometry.boundingBox.clone();
    }

    getBoundingBox() {
        console.log(this.room.boundingBox)
        return this.room.boundingBox
    }
}

export default Title;
