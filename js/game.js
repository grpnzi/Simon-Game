//GAME JS
console.log('GAME JS IS WORKING');
class Game {

    constructor(difficult) {
        this.round = 0;
        this.gameScreen = document.getElementById("game-screen");
        this.startScreen = document.getElementById("game-intro");
        this.endScreen = document.getElementById("game-end");
        this.board = new Board(this.round,difficult)
        this.gameIsOver = false;
    }

    start() {
        this.endScreen.style.display = "none";
        // Hide the starter screen
        this.startScreen.style.display = "none";
        // display the game screen
        this.gameScreen.style.display = "block";
        // 
        this.board.start();
        // start the game loop
        this.gameLoop();
    }

    gameLoop() {

        // This function it's calling itself in a loop
        if (!this.board.gameIsOver) {
            window.requestAnimationFrame(() => this.gameLoop())
            this.update();
        }
 
    }

    update() {
        // console.log('Update method');
        this.board.clickScanner();

        if (this.board.gameIsOver) {
            this.end();
        }

    }

    end() {
        console.log("end game");
        const score = document.getElementById("score");

        this.gameScreen.style.display = "none";
        // Display the starter screen
        this.endScreen.style.display = "block";

        score.innerHTML = `YOUR SCORE: ${this.board.round}`

    }
}