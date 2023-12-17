import GameObject from "../engine/gameobject.js";
import Physics from "../engine/physics.js";
import Renderer from "../engine/renderer.js";
import { Images } from "../engine/resources.js";

class Projectile extends GameObject{

    constructor(x,y,direction,directionY){
        super(x,y);
        this.direction = direction;
        this.directionY = directionY;
        this.timer = 0;
        this.addComponent(new Physics({x:4*this.direction,y:-4*this.directionY},{x:0,y:0},{x:0,y:0}));
        this.addComponent(new Renderer("red",20,20,Images.projectile));
    
        
    }

    update(deltaTime){

        this.timer+=deltaTime;

        if (this.timer > 1){
            this.game.removeGameObject(this);        //after timer is reached it removes itself
        }


        super.update(deltaTime);
        //console.log("whatcha doin");

    }

}

export default Projectile;