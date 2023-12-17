import GameObject from "../engine/gameobject.js";
import Sound from "../engine/sound.js";
import { AudioFiles } from "../engine/resources.js";


class MusicMan7 extends GameObject{
    constructor(){
        super(0,0);
        this.addComponent(new Sound());
        this.getComponent(Sound).add(AudioFiles.ambience);  // gets the sound

    }

    update(deltaTime){
        super.update(deltaTime);
        this.getComponent(Sound).loopsSound(0);    // calls the method
    }


}

export default MusicMan7;