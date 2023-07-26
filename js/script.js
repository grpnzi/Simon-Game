//  script js
window.onload = function () {
  console.log('SCRIPT JS IS WORKING');
  const startButton = document.getElementById("start-button");
  const easyButton = document.getElementById("easy-button");
  const hardButton = document.getElementById("hard-button");
  const colorPart = document.getElementsByClassName("color-part");
  const colorPartArray = Array.from(colorPart);
  const difficult = {easy: 500, hard: 150};

  let modeSet;
  let game;

  startButton.addEventListener("click", function () {
    console.log("starting game");
    startGame();
  });

  easyButton.addEventListener("click", function () {
    console.log("easy mode");
    console.log(difficult.easy);
    modeSet = difficult.easy;
  });

  hardButton.addEventListener("click", function () {
    console.log("hard mode");
    modeSet = difficult.hard;
  });
  
  function startGame() {
    if (!modeSet) modeSet = difficult.easy;
    game = new Game(modeSet);

    game.start();
  }

  function handleMouseInput(click) {
    if (game.board.generatingSequence) return;
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