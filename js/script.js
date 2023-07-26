//  script js
window.onload = function () {
  console.log('SCRIPT JS IS WORKING');
  const startButton = document.getElementById("start-button");
  const easyButton = document.getElementById("easy-button");
  const hardButton = document.getElementById("hard-button");
  const colorPart = document.getElementsByClassName("color-part");
  const colorPartArray = Array.from(colorPart);
  const difficult = {easy: 500, hard: 150};

  let inactivityTimeout;
  let modeSet;
  let game;

  startButton.addEventListener("click", function () {
    console.log("starting game");
    startGame();
  });

  easyButton.addEventListener("click", function () {
    console.log("easy mode");
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
    resetInactivityTimer();
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
        resetInactivityTimer();
      }
    });
  });

  function resetInactivityTimer() {
    // Clear the previous timeout (if any)
    clearTimeout(inactivityTimeout);

    // Set a new timeout of 5 seconds (5000 milliseconds)
    inactivityTimeout = setTimeout(function () {
        // This code will be executed when the user is inactive for 5 seconds
        alert("You have been inactive for 10 seconds.");
        game.board.gameIsOver = true;
        game.board.sounds.play(game.board.sounds.gameOver);
        // Perform any action needed for inactivity here.
    }, 10000);
  }

};