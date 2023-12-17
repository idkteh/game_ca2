import GameObject from "../engine/gameobject.js";
import Sound from "../engine/sound.js";
import { AudioFiles } from "../engine/resources.js";




class MusicMan7 extends GameObject{
    constructor(){
        super(0,0);
        this.addComponent(new Sound());
        this.getComponent(Sound).add(AudioFiles.ambience);

    }

    update(deltaTime){
        super.update(deltaTime);
        this.getComponent(Sound).loopsSound(0);
    }


}

export default MusicMan7;