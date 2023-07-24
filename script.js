window.onload = function () {
    console.log('SCRIPT JS IS WORKING');
    const startButton = document.getElementById("start-button");

    let game;
    let board;

    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
      game = new Game();
      board = new Board();

      game.start();
    }


};