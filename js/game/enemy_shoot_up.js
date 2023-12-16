import Enemy from "./enemy.js";
import Projectile from "./projectile.js";

class Enemy_shoot_up extends Enemy{

    constructor(x, y,movementDistance,movementLimit,speed){
        super(x, y,movementDistance,movementLimit,speed);

        this.shootTime = 0;

    }

    update(deltaTime){
        this.shootTime += deltaTime;
    
        if (this.shootTime > 0.5){
          this.game.addGameObject(new Projectile(this.x, this.y, 0,1));
          this.shootTime = 0;
        }

        super.update(deltaTime);
    }
}

export default Enemy_shoot_up;