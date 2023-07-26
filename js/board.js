//Board JS
console.log('BOARD JS IS WORKING');
class Board {

    constructor(round) {
        this.colors = {
            color1: {
              current: "#026402",
              new: "#11e711",
            },
            color2: {
              current: "#971900",
              new: "#fd2a2a",
            },
            color3: {
              current: "#0b017d",
              new: "#2062fc",
            },
            color4: {
              current: "#797d01",
              new: "#fafa18",
            },
        };

        this.randomColors = [];
        this.clickSequence = [];
        this.countValue = document.getElementById("count");
        this.colorPart = document.querySelectorAll(".color-part");
        // generatingSequence is used to indicate whether the color sequence is being generated (true) or whether the user should click on the colors (false).
        this.generatingSequence = false;
        this.clickCount = 0;
        this.round = round;
        this.gameIsOver = false;
        this.sounds = new Sounds();
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

    //Function to play the sequence
    async pathDecide () {
        this.countValue.innerText = this.round;

        for (let i of this.randomColors) {
            let currentColor = document.querySelector(`#${i}`);
            await this.wait(500);

            // Play the sound associated with the color before changing the background color
            this.sounds.play(this.sounds[i]);

            currentColor.style.backgroundColor = `${this.colors[i]["new"]}`;
            await this.wait(500);
            currentColor.style.backgroundColor = `${this.colors[i]["current"]}`;
            await this.wait(500);
        }
    
        this.generatingSequence = false;
    };

    start() {
        this.sequenceGenerator(this.round);
        this.clickScanner();

    }

    async clickScanner() {
        if (this.generatingSequence) return false;

        if (!this.clickSequence.length) return false;

        if (this.generatingSequence || this.clickCount >= this.clickSequence.length) return false;

        if (this.clickSequence[this.clickCount].id == this.randomColors[this.clickCount]) {
            // Play the sound associated with the color
            let sound = this.clickSequence[this.clickCount].id;
            this.sounds.play(this.sounds[sound]);
            //Color blick effect on click
            
            this.clickSequence[this.clickCount].style.backgroundColor = `${
            this.colors[this.randomColors[this.clickCount]]["new"]
            }`;

            // Using setTimeout for the delay
            setTimeout(() => {
                // Reset the color back to the original
                if (this.clickSequence[this.clickCount]) {
                    this.clickSequence[this.clickCount].style.backgroundColor = `${
                    his.colors[this.randomColors[this.clickCount]]["current"]
                    }`;
        
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
                        }, 1000);
                    }
                }
            }, 500);

        } else {
            this.gameIsOver = true;
            this.sounds.play(this.sounds.gameOver);
        }
    }

    // reset all the games values
    reset() {
        this.randomColors = [];
        this.clickCount = 0;
        this.round = 0;
        this.generatingSequence = false;
    }
}