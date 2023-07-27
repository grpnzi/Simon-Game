//  script js
window.onload = function () {
  console.log('SCRIPT JS IS WORKING');
  const startButton = document.getElementsByClassName('start-button');
  const startButtonArray = Array.from(startButton);
  const easyButton = document.getElementById("easy-button");
  const hardButton = document.getElementById("hard-button");
  const effectArray = document.getElementsByClassName("effect")
  const effectEasy = effectArray[0];
  const effectDifficult = effectArray[1];
  const colorPart = document.getElementsByClassName("color-part");
  const colorPartArray = Array.from(colorPart);
  const difficult = {easy: 500, hard: 150};

  let inactivityTimeout;
  let modeSet;
  let game;

  // start the game when the button start is pressed
  startButtonArray.forEach(element => {
      element.addEventListener("click", (event) => {
        console.log("starting game");
        startGame();
      })
  });

  // set the difficult level to easy
  easyButton.addEventListener("click", function () {
    console.log("easy mode");
    updateButtonClasses()
    modeSet = difficult.easy;
  });

  // set the difficult level to hard
  hardButton.addEventListener("click", function () {
    console.log("hard mode");
    updateButtonClasses()
    modeSet = difficult.hard;
  });
  
  // starts the game
  function startGame() {
    if (!modeSet) modeSet = difficult.easy;
    game = new Game(modeSet);

    game.start();
    resetInactivityTimer();
  }

  // detect if you are clicking the colors
  function handleMouseInput(click) {
    // check if is the sequence is running to not catch any click
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

  // check inactivity
  function resetInactivityTimer() {
    // Clear the previous timeout (if any)
    clearTimeout(inactivityTimeout);

      inactivityTimeout = setTimeout(function () {
          // This code will be executed when the user is inactive
          console.log('timeout');
          game.board.gameIsOver = true;
          game.end();

          game.board.sounds.play(game.board.sounds.gameOver);
    
      }, 90000);
  }

  function updateButtonClasses() {
    if (effectDifficult.getAttribute("class") === "effect") {
      hardButton.classList.add("non-effect");
      hardButton.classList.remove("effect");
      easyButton.classList.remove("non-effect")
      easyButton.classList.add("effect")
    } else {
      easyButton.classList.add("non-effect");
      easyButton.classList.remove("effect");
      hardButton.classList.remove("non-effect")
      hardButton.classList.add("effect")
    }
  }
};