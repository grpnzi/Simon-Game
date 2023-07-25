//  script js
window.onload = function () {
  console.log('SCRIPT JS IS WORKING');
  const startButton = document.getElementById("start-button");
  const colorPart = document.getElementsByClassName("color-part");
  const colorPartArray = Array.from(colorPart);
  let game;

  startButton.addEventListener("click", function () {
    console.log("starting game");
    startGame();
  });
  
  function startGame() {
    game = new Game();

    game.start();
  }

  function handleMouseInput(click) {
    game.board.clickSequence.push(click.target);
    
  }
  
  // check if colors are beeing clicked
  colorPartArray.forEach((element) => {
    element.addEventListener("click", (event) => {
      // Check if the clicked element has the class "color-part"
      if (event.target.classList.contains("color-part")) {
        handleMouseInput(event);
      }
    });
  });

};