//Board JS
console.log('BOARD JS IS WORKING');
class Board {

    constructor(round, difficult) {
        this.colors = {
            color1: {
              current: "#026402",
              new: "#02FF02",
            },
            color2: {
              current: "#971900",
              new: "#FF1900",
            },
            color3: {
              current: "#0b017d",
              new: "#0B01FF",
            },
            color4: {
              current: "#797d01",
              new: "#F7FF03",
            },
        };

        this.randomColors = [];
        this.clickSequence = [];
        this.countValue = document.getElementById("count");
        this.colorPart = document.querySelectorAll(".color-part");
        // generatingSequence is used to indicate whether the color sequence is being generated (true)
        this.generatingSequence = false;
        this.clickCount = 0;
        this.round = round;
        this.gameIsOver = false;
        this.sounds = new Sounds();
        this.difficult = difficult;
    }

    //Function to get a random value from object
    generateRandomValue(object) {
        let arr = Object.keys(object);
        return arr[Math.floor(Math.random() * arr.length)];
    };

    //Function to decide the sequence for each itiration de length of the randomColors grows by 1 
    sequenceGenerator() {
        this.randomColors.push(this.generateRandomValue(this.colors));
        this.round = this.randomColors.length;
        this.generatingSequence = true;
        this.pathDecide(this.round);
    };

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to play the sequence
    async pathDecide () {
        this.countValue.innerText = this.round;

        for (let i of this.randomColors) {
            let currentColor = document.querySelector(`#${i}`);
            await this.wait(this.difficult);

            // Play the sound associated with the color before changing the background color
            this.sounds.play(this.sounds[i]);

            // change the color background waiting x time to execute 
            currentColor.style.backgroundColor = `${this.colors[i]["new"]}`;
            await this.wait(this.difficult);
            currentColor.style.backgroundColor = `${this.colors[i]["current"]}`;
            await this.wait(this.difficult);
        }
    
        this.generatingSequence = false;
    };

    start() {
        this.sequenceGenerator(this.round);
        this.clickScanner();

    }

    // check if the player is clicking the correct pattern
    clickScanner() {
        // check if the pattern is beeing showed to the player
        if (this.generatingSequence) return false;
        // check if the player has clicked something
        if (!this.clickSequence.length) return false;

        if (this.generatingSequence || this.clickCount >= this.clickSequence.length) return false;

        // If the color pressed match with the color it has to be
        if (this.clickSequence[this.clickCount].id == this.randomColors[this.clickCount]) {

            //Color blick effect on click
            
            this.clickSequence[this.clickCount].style.backgroundColor = `${this.colors[this.randomColors[this.clickCount]]["new"]}`;

                // Using setTimeout for the delay
                setTimeout(() => {
                    // Check if click sequence is not returning undefined
                    if (this.clickSequence[this.clickCount]) {
                        // Play the sound associated with the color
                        let sound = this.clickSequence[this.clickCount].id;
                        this.sounds.play(this.sounds[sound]);

                        this.clickSequence[this.clickCount].style.backgroundColor = `${this.colors[this.randomColors[this.clickCount]]["current"]}`;

                            //User click
                            this.clickCount += 1;
                            
                            //Next level if number of valid clicks == round
                            if (this.clickCount == this.round) {
                                this.clickCount = 0;
                                this.clickSequence = []
        
                            // Using setTimeout for the delay before starting the next round
                            setTimeout(() => {
                                this.sequenceGenerator();
                                this.sounds.play(this.sounds.success);
                            }, 1200);
                        }
                    }
                }, 200);
        // ends the game
        } else {
            this.gameIsOver = true;
            this.sounds.play(this.sounds.gameOver);
        }
    }

}