// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Obstacle from './obstacle.js';
import Enemy_shoot_up from './enemy_shoot_up.js';
import Enemy_shoot_side from './enemy_shoot_side.js';
import MusicMan7 from './music_man7.js';
// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);

    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    this.addGameObject(new Obstacle(50, 850, 450, 30, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(-523, 553, 240,130, "rgb(252,228,132)"));

    // Create platforms and add them to the game
    const platforms = [

      new Platform(-100.0, 650.0, 200.0, 500.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(500.0, 650.0, 200.0, 500.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(750.0, 650.0, 200.0, 500.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(1362.0, 650.0, 400.0, 500.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(1836.0, 539.0, 200.0, 50.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(2153.0, 333.0, 500.0, 50.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(1389.0, 113.0, 500.0, 50.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(572.0, -68.0, 500.0, 50.0, "rgb(48, 41, 22)", "platform"),
      new Platform(525.0, -257.0, 50.0, 25.0, "rgb(48, 41, 22)", "platform"),
      new Platform(572.0, -323.0, 100.0, 300.0, "rgb(48, 41, 22)", "platform"),
      new Platform(475.0, -137.0, 100.0, 25.0, "rgb(48, 41, 22)", "platform"),
      new Platform(-280.0, -211.0, 453.0, 79.0, "rgb(48, 41, 22)", "platform"),
      new Platform(256.0, 82.0, 186.0, 30.0, "rgb(48, 41, 22)", "platform"),
      new Platform(-824.0, 653.0, 134.0, 40.0, "rgb(48, 41, 22)", "platform"),
      new Platform(3066.0, 98.0, 758.0, 34.0, "rgb(48, 41, 22)", "platform"),
      new Platform(3142.0, -148.0, 147.0, 60.0, "rgb(48, 41, 22)", "platform"),
      new Platform(3600.0, -148.0, 147.0, 60.0, "rgb(48, 41, 22)", "platform"),
      new Platform(-464.0, 804.0, 123.0, 40.0, "rgb(48, 41, 22)", "platform"),

      
    ];

    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create enemies and add them to the game
  //this.addGameObject(new Enemy_shoot_up(150, 800,0,2.5,2));
  //this.addGameObject(new Enemy_shoot_side(0, 500,5,0.5,1,0));
  //   this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
  //   this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));
  
    //this.addGameObject(new Obstacle(500, this.canvas.height - 70, 50, 30, "rgb(252,228,132)"));
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));
    // this.addGameObject(new Obstacle(platformWidth + gap, this.canvas.height - 70, 50, 30, "red"));


    
 
   
    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(300, 750, 25, 25));
    this.addGameObject(new Collectible(0, 500, 25, 25));
    this.addGameObject(new Collectible(600, 500, 25, 25));


    this.addGameObject(new MusicMan7());
  }
  
}

// Export the Level class as the default export of this module
export default Level;
