// Import the required modules and classes.
import Component from './component.js';
import Renderer from './renderer.js';
import Platform from '../game/platform.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 10 }) {
    super(); // Call the parent constructor.
    this.velocity = velocity; // Initialize the velocity.
    this.acceleration = acceleration; // Initialize the acceleration.
    this.gravity = gravity; // Initialize the gravity.
  }

  // The update method handles how the component's state changes over time.
  update(deltaTime) {
   // Update velocity based on acceleration and gravity.


   // Code taken from https://github.com/Ruby101-was-taken/FinalGameEngine
   this.velocity.x += this.acceleration.x* deltaTime; 
   this.velocity.y += (this.acceleration.y + this.gravity.y)* deltaTime;
 
   const platforms = this.gameObject.game.gameObjects.filter((obj) => obj instanceof Platform);     // makes list of every platform
   
   this.isGrounded = false;
   for(let i=0; i<Math.abs(this.velocity.y); i++){
     this.gameObject.y+=Math.sign(this.velocity.y);                     // moves the object 1 unit in the direction y velocity
     for(const obj of platforms){
       if(obj.getComponent(Physics).isColliding(this)){              // check collision
         if(this.velocity.y<0){
          this.gameObject.y+=1;
          this.velocity.y=0; 
          this.velocity.y=+1; 
        } 
        else if(this.velocity.y>=0){                          // if we moving up or down and hit platform, we go the other way
          this.gameObject.y-=1;
          this.isGrounded = true;                            // check if on platform
          this.velocity.y=0;
        }
       }
     }
   }
   for(let i=0; i<Math.abs(this.velocity.x); i++){
     this.gameObject.x+=Math.sign(this.velocity.x);
     
     for(const obj of platforms){
          if(obj.getComponent(Physics).isColliding(this)){
          
           this.gameObject.x-=Math.sign(this.velocity.x);                       // if we move in x direction and hit platform, move back
           this.velocity.x = 0;
          }
       }
    
      }
 }
   

  // The isColliding method checks if this game object is colliding with another game object.
  isColliding(otherPhysics) {
    // Get the bounding boxes of both game objects.
    const [left, right, top, bottom] = this.getBoundingBox();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();

    // Check if the bounding boxes overlap. If they do, return true. If not, return false.
    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  // The getBoundingBox method returns the bounding box of the game object in terms of its left, right, top, and bottom edges.
  getBoundingBox() {
    // Get the Renderer component of the game object to get its width and height.
    const renderer = this.gameObject.getComponent(Renderer);
    // Calculate the left, right, top, and bottom edges of the bounding box.
    const left = this.gameObject.x;
    const right = this.gameObject.x + renderer.width;
    const top = this.gameObject.y;
    const bottom = this.gameObject.y + renderer.height;

    // Return the bounding box.
    return [left, right, top, bottom];
  }
}

// The Physics class is then exported as the default export of this module.
export default Physics;
