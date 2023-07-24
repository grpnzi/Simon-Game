window.onload = function () {
    console.log('SCRIPT JS IS WORKING');
    const startButton = document.getElementById("start-button");

    let game;
    let board;

    startButton.addEventListener("click", function () {
      console.log('START BUTTON IS WORKING');
      startGame();
    });
  
    function startGame() {
      console.log("start game");
      game = new Game();
      board = new Board(game.count,game.clickCount,game.round);

      game.start();
    }

};