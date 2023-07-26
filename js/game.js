//GAME JS
console.log('GAME JS IS WORKING');
class Game {

    constructor() {
        this.round = 0;
        this.gameScreen = document.getElementById("game-screen");
        this.startScreen = document.getElementById("game-intro");
        this.endScreen = document.getElementById("game-end");
        this.startButton = document.getElementById("start-button");
        this.board = new Board(this.round)
        this.gameIsOver = false;
    }

    start() {
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

        this.gameScreen.style.display = "none";
        // Display the starter screen
        this.endScreen.style.display = "block";
        this.endScreen.innerHTML = `
        <button id="start-button">Start Game</button>
        <h1>Your score: ${this.board.round}</h1>`;

        this.startButton.addEventListener("click", function () {
            console.log("boton mierdoso");
            this.endScreen.style.display = "none";
            this.board.reset();
        });

    }
}