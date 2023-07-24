//GAME JS
console.log('GAME JS IS WORKING');
class Game {

    constructor() {
        this.round = 0;
        this.gameScreen = document.getElementById("game-screen");
        this.board = new Board()
        this.startScreen = document.getElementById("game-intro");
        this.clickCount = 0;
        this.gameIsOver = false;
        // this.gameEndScreen = document.getElementById("game-end");
    }

    start() {
        //Hide the starter screen
        this.startScreen.style.display = "none";
        // display the game screen
        this.gameScreen.style.display = "block";
        // 
        this.board.start();
        // start the game loop
        this.gameLoop();
    }

    gameLoop() {
        console.log('GAME LOOP STARTED');
        this.gameIsOver = this.board.lose();

        if (this.gameIsOver) {
            console.log('The game is over');
            this.end();
            return;
        }

        // This function it's calling itself in a loop
        window.requestAnimationFrame(() => this.gameLoop())
    }

    end() {
        // Hide the game screen
        this.startScreen.style.display = "none";
        // Display the starter screen
        this.gameScreen.style.display = "block";
    }
}