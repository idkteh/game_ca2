import GameObject from "../engine/gameobject.js";
import Physics from "../engine/physics.js";
import Renderer from "../engine/renderer.js";
import { Images } from "../engine/resources.js";

class Projectile extends GameObject{

    constructor(x,y,direction){
        super(x,y);
        this.direction = direction;
        this.timer = 0;
        this.addComponent(new Physics({x:0,y:-100},{x:0,y:0},{x:0,y:0}));
        this.addComponent(new Renderer("red",20,20,Images.projectile));
        console.log(`${this.x}, ${this.y}`);
    }

    update(deltaTime){

        this.timer+=deltaTime;

        

        if (this.timer > 5){
            this.game.removeGameObject(this);        //after timer is reached it removes itself
        }


        super.update(deltaTime);
        //console.log("whatcha doin");

    }

}

export default Projectile;