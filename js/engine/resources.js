// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  coin: new Image(),
  projectile: new Image(),
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio('./resources/audio/jump.ogg'), 
  ambience: new Audio('./resources/audio/ambience.mp3'),
  dash: new Audio('./resources/audio/dash.mp3'),

  //collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/cat.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/rat.png'; // Update the image path

Images.projectile.src = './resources/images/projectile/cheese.png'; // Added projectile path

Images.coin.src = './resources/images/coin/food.png';

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };