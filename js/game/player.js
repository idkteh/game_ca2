// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images, AudioFiles } from '../engine/resources.js';
import Enemy from './enemy.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import Obstacle from './obstacle.js';
import Projectile from './projectile.js';
import Sound from '../engine/sound.js';
import UI from '../engine/ui.js';


// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 60, 60, Images.player); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    this.addComponent(new Sound());
    this.getComponent(Sound).add(AudioFiles.jump);
    this.getComponent(Sound).add(AudioFiles.dash);
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 9;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 4;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.hasDoublejump = true;
    this.doubleJumpCool = 0;
    this.canDash = true;
    this.dashSpeed = 5;
    this.dashLasts = 0;
    this.dashCool = 0;

    this.firstFrame = true;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {

    // if (this.firstFrame){                        // we read the collectibles variable to be able to se the limit for score
    //   const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    //   this.totalCollectibles = collectibles.lenght;               
    //   this.firsFrame = false;
    // }                                      // i tried, i failed, i'll hardcode it instead
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    this.handleGamepadInput(input);
    
    // Handle player movement
    if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = 4;
      this.direction = -1;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -4;
      this.direction = 1;
    } else if (!this.isGamepadMovement){
      physics.velocity.x = 0;
    }

    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('ArrowUp')&& physics.isGrounded) {       //handles jump
      this.startJump();
      this.getComponent(Sound).play(0);
      this.doubleJumpCool = .5;
    }else if (!this.isGamepadJump && input.isKeyDown('ArrowUp') && this.hasDoublejump && this.doubleJumpCool<=0){ //handles double jump
      this.startJump();
      this.getComponent(Sound).play(0);
      this.hasDoublejump = false;
    }
  
    this.doubleJump(deltaTime);

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy || obj instanceof Projectile);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }


    // Handle collision with Obstacle
    const obstacles = this.game.gameObjects.filter((obj) => obj instanceof Obstacle);
    for (const obstacle of obstacles) {
      if (physics.isColliding(obstacle.getComponent(Physics))) {
        this.collidedWithObstacle();
        this.resetPlayerState();     // any contact wiht obstacle automatically resets the game (good luck)
      }
    }
  
   
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > 1000) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      this.resetGame();
    }

    // Check if player has collected all collectibles
    if (this.score >= 23) {                        // used to be this.totalCollectibles, no idea why it doesn't work anymore
      this.resetGame();
    }

    // calling dash methodS
    this.dashForward(deltaTime,input,physics);
    

    super.update(deltaTime);
  }

  // Dash method
  dashForward(deltaTime,input,physics){ 
    if(this.canDash && input.isKeyDown("Space")&& this.dashLasts<=0 && this.dashCool<=0){ 
      this.dashLasts = .5;                            // starts dash
      this.getComponent(Sound).play(1);               // plays sound
    }else if(this.dashLasts>0){      
      this.dashLasts-=deltaTime;       
      physics.velocity.x = -this.dashSpeed*this.direction;  //dash actually goes to the right direction
      this.dashCool=1;
    }else if(this.dashCool>0){      // doesn't let you dash again for a little while
      this.dashCool-=deltaTime;
    }
  }

  // Double jump method
  doubleJump(deltaTime){
    if (this.getComponent(Physics).isGrounded){
      this.hasDoublejump = true;
      this.canDash = true;
    }
    if(this.doubleJumpCool>0){
      this.doubleJumpCool-=deltaTime; //when we start jump it adds little timer so we can double jump in normal time not instantly
    }
    
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
  
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  // Checking collison with obstacles
  collidedWithObstacle(){
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {this.isInvulnerable = false;}, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    if(!collectible.collected){
      this.score += collectible.value;
      this.emitCollectParticles(collectible);
      collectible.collected = true;
    }
    }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
    this.game.reset();
    this.score = 0;                               
  } 

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();              // instead of refreshing page it resets values
  }

}

export default Player;
