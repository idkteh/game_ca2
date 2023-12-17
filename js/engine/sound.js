import Component from "./component.js";

class Sound extends Component{

    constructor(){
        super();
        this.sound = []; 
    }

    //explain
    add(path){
        this.sound.push(path);
    }

    play(index){
        new Audio(this.sound[index].src).play();   // creates new object and plays
    }
    
    loopsSound(index){  
        this.sound[index].play();            // if the sound is already playing it won't play cause it plays the object
    }
}

export default Sound;