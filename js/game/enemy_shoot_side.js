import Enemy from "./enemy.js";
import Projectile from "./projectile.js";

class Enemy_shoot_side extends Enemy{

    constructor(x, y,movementDistance,movementLimit,shootDirection,speed){
        super(x, y,movementDistance,movementLimit,speed);

        this.shootTime = 0;

        this.shootDirection = shootDirection;

    }


    // explain 
    update(deltaTime){
        this.shootTime += deltaTime;
    
        if (this.shootTime > 1){
          this.game.addGameObject(new Projectile(this.x, this.y, this.shootDirection,0));   // same x axis
          this.shootTime = 0;
        }

        super.update(deltaTime);
    }
}

export default Enemy_shoot_side;