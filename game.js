//GAME JS
console.log('GAME JS IS WORKING');
class Game {

    constructor() {
        this.gameScreen = document.getElementById("game-screen");
        this.player = null
        this.startScreen = document.getElementById("game-intro");
        this.count = 0;
        this.clickCount = 0;
        this.round = 0;
        this.gameIsOver = false;
        // this.gameEndScreen = document.getElementById("game-end");
    }

    start() {
        //Hide the starter screen
        console.log(this.gameScreen);
        this.startScreen.style.display = "none";
        // display the game screen
        this.gameScreen.style.display = "block";
        // start the game loop
        this.gameLoop()
    }

    gameLoop() {
        console.log('GAME LOOP STARTED');
        if (this.gameIsOver) {
            console.log('THE game is over');
            return
        }
        this.update();

        // This function it's calling itself in a loop
        window.requestAnimationFrame(() => this.gameLoop())
    }

    update() {
    }
}