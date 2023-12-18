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
    
    

    // Set the game's camera target to the player
    this.camera.target = player;

     

    // creating obstacles
    this.addGameObject(new Obstacle(50, 850, 450, 30, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(920, 850, 450, 30, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(-523, 550, 240,100, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(-1206, 330, 128, 297, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(-1206, 626, 164, 100, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(1540, 557, 34, 100, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(2153, 380, 30, 207, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(2036, 539, 146, 50, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(3934, -513, 356, 642, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(1072, 113, 317, 52, "rgb(252,228,132)"));
    this.addGameObject(new Obstacle(1072, -68, 48, 217, "rgb(252,228,132)"));
    

    // Create platforms and add them to the game
    const platforms = [

      new Platform(-100.0, 650.0, 200.0, 500.0, "rgb(48, 41, 22)", "Platform"),
      new Platform(500.0, 650.0, 300.0, 500.0, "rgb(48, 41, 22)", "Platform"),
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
      new Platform(3066.0, 98.0, 870, 34.0, "rgb(48, 41, 22)", "platform"),
      new Platform(3142.0, -148.0, 147.0, 60.0, "rgb(48, 41, 22)", "platform"),
      new Platform(3600.0, -148.0, 147.0, 60.0, "rgb(48, 41, 22)", "platform"),
      new Platform(-464.0, 804.0, 123.0, 40.0, "rgb(48, 41, 22)", "platform"),

      
    ];

    for (const platform of platforms) {
      this.addGameObject(platform);
    }

   

    
  
    // tuna cans to collect
    this.addGameObject(new Collectible(280, 750, 25, 25));
    this.addGameObject(new Collectible(600, 500, 25, 25));
    this.addGameObject(new Collectible(-10, 500, 25, 25));
    this.addGameObject(new Collectible(-775, 596, 25, 25));
    this.addGameObject(new Collectible(-413, 728, 25, 25));
    this.addGameObject(new Collectible(830, 500, 25, 25));
    this.addGameObject(new Collectible(1150, 750, 25, 25));
    this.addGameObject(new Collectible(1421, 200, 25, 25));
    this.addGameObject(new Collectible(1535, 430, 25, 25));
    this.addGameObject(new Collectible(2025, 415, 25, 25)); 
    this.addGameObject(new Collectible(2560, 225, 25, 25));
    this.addGameObject(new Collectible(2800, 133, 25, 25));
    this.addGameObject(new Collectible(3430, -325, 25, 25));
    this.addGameObject(new Collectible(2005, 160, 25, 25));
    this.addGameObject(new Collectible(1610, 30, 25, 25));
    this.addGameObject(new Collectible(1221, -5, 25, 25));
    this.addGameObject(new Collectible(1005, -129, 25, 25));
    this.addGameObject(new Collectible(850, -245, 25, 25));
    this.addGameObject(new Collectible(532, -293, 25, 25));
    this.addGameObject(new Collectible(520, -175, 25, 25));
    this.addGameObject(new Collectible(340, 12, 25, 25));
    this.addGameObject(new Collectible(-202, -430, 25, 25));
    this.addGameObject(new Collectible(28, -307, 25, 25));

    // Enemies
    this.addGameObject(new Enemy_shoot_up(150, 800,0,2.5,2));
    this.addGameObject(new Enemy_shoot_up(950, 800,0,2.5,2));
    this.addGameObject(new Enemy_shoot_up(3300, -40,0,1.7,2));
    this.addGameObject(new Enemy_shoot_up(714, -170,0,1,2));
    this.addGameObject(new Enemy_shoot_side(-1063, 528,5,0.5,1,0));
    this.addGameObject(new Enemy_shoot_side(-260, -311,5,0.5,1,0));
    


      
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // adding background music
    this.addGameObject(new MusicMan7());
  }
  
}

// Export the Level class as the default export of this module
export default Level;
