//GAME JS
console.log('GAME JS IS WORKING');
class Game {

    constructor() {
        this.round = 0;
        this.gameScreen = document.getElementById("game-screen");
        this.startScreen = document.getElementById("game-intro");
        this.board = new Board()
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
        // console.log('GAME LOOP STARTED');
        
        // setTimeout(() => {
        //     if (!this.board.generatingSequence) {
        //         this.gameIsOver = true; 
        //         this.end();
        //         return;
        //     }
        // }, 5000);

        this.update();


        // This function it's calling itself in a loop
        window.requestAnimationFrame(() => this.gameLoop())
    }

    update() {
        // console.log('Update method');

        this.board.clickScanner();
    }

    end() {
        console.log("Showing end");
        this.gameIsOver = false

        this.gameScreen.style.display = "none";
        // Display the starter screen
        this.startScreen.style.display = "block";

        this.board.reset();
    }
}