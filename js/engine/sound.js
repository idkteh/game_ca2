import Component from "./component.js";

class Sound extends Component{

    constructor(){
        super();
        this.sound = [];
    }

    add(path){
        this.sound.push(path);
    }

    play(index){
        this.sound[index].play();
    }
}

export default Sound;