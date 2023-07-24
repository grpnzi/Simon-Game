//Board JS
console.log('BOARD JS IS WORKING');
class Board {

    constructor() {
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
        this.generatingSequence = false;
        this.clickCount = 0;
    }

    //Function to get a random value from object
    generateRandomValue(object) {
        let arr = Object.keys(object);
        return arr[Math.floor(Math.random() * arr.length)];
    };

    sequenceGenerator(round) {
        for (let j = 0; j < round + 4; j++) {
            this.randomColors.push(this.generateRandomValue(this.colors));
            this.generatingSequence = true;
        }
    };

    //Function to play the sequence
    async pathDecide (round) {
        this.countValue.innerText = round;


        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        for (let i of this.randomColors) {
            let currentColor = document.querySelector(`#${i}`);
            currentColor.style.backgroundColor = `${this.colors[i]["new"]}`;
            await wait(1000); 
            currentColor.style.backgroundColor = `${this.colors[i]["current"]}`;
            await wait(1000);
        }
        this.generatingSequence = false;
    };

    start(round) {
        this.sequenceGenerator(round);
        this.pathDecide(round);
        console.log(this.randomColors);
    }

    checkUserPatern() {
        
    }
}