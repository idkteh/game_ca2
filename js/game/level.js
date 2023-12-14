// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Obstacle from './obstacle.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId, color = "rgb(196, 177, 118)") {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    this.color = color;
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's widt const platformWidth = 200;
    const gap = 100;

    this.addGameObject(new Obstacle(50, 850, 450, 30, "red"));

    // Create platforms and add them to the game
    const platforms = [
      new Platform(-100, 650, 200, 500, "rgb(48, 41, 22)", "Platform"),
      new Platform(500, 650, 200, 500, "rgb(48, 41, 22)", "Platform"),
      new Platform(750, 650, 200, 500, "rgb(48, 41, 22)", "Platform"),
      new Platform(1362, 650, 400, 500, "rgb(48, 41, 22)", "Platform"),

     
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create enemies and add them to the game
  //   this.addGameObject(new Enemy(50, this.canvas.height - 90));
  //   this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
  //   this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));
  
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));


    
 
   
    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(300, 800, 20, 20));
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
