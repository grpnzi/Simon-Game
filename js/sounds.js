class Sounds {
    constructor(){
        this.color1 = new Audio("./audio/color1.mp3")
        this.color2 = new Audio("./audio/color2.mp3")
        this.color3 = new Audio("./audio/color3.mp3")
        this.color4 = new Audio("./audio/color4.mp3")
        this.success = new Audio("./audio/success.mp3")
        this.gameOver = new Audio("./audio/game-over-arcade.mp3")
    }

    play(sound){
        sound.play()
    }
}