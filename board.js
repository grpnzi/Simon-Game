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
        this.countValue = document.getElementById("count");
        this.colorPart = document.querySelectorAll(".color-part");
        // generatingSequence is used to indicate whether the color sequence is being generated (true) or whether the user should click on the colors (false).
        this.generatingSequence = false;
        this.clickCount = 0;
        this.round = round
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
            currentColor.style.backgroundColor = `${this.colors[i]["new"]}`;
            await this.wait(400);
            currentColor.style.backgroundColor = `${this.colors[i]["current"]}`;
            await this.wait(600);
        }
    
        this.generatingSequence = false;
    };

    start() {
        this.sequenceGenerator(this.round);
        this.checkUserPatern()
        console.log(this.randomColors);
    }

    async checkUserPatern() {
        this.colorPart.forEach((element) => {
            console.log(element);
            element.addEventListener("click", async (event) => {
            //if user clicks the same color then next level
                if (this.generatingSequence) {
                    return false;
                }

                if (event.target.id == this.randomColors[this.clickCount]) {
                    //Color blick effect on click
                    event.target.style.backgroundColor = `${
                    this.colors[this.randomColors[this.clickCount]]["new"]
                    }`;
                    await this.wait(500);
                    event.target.style.backgroundColor = `${
                    this.colors[this.randomColors[this.clickCount]]["current"]
                    }`;
                    //User click
                    this.clickCount += 1;
                    //Next level if number of valid clicks == round

                    if (this.clickCount == this.round) {
                        this.clickCount = 0;
                        this.sequenceGenerator();
    
                    } 

                } else {
                    this.lose();
                }
            })
        })
    }

    lose() {
        return true;
    }
}