//Board JS
console.log('BOARD JS IS WORKING');
class Board {

    constructor(count, clickCount, round) {
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
        this.count = count;
        this.clickCount = clickCount;
        this.round = round;
        this.sequenceGeneratorBool = false;
        this.randomColors = [];
    }


    //Function to get a random value from object
    generateRandomValue(object) {
        let arr = Object.keys(object);
        return arr[Math.floor(Math.random() * arr.length)];
    };

    sequenceGenerator() {
        randomColors.push(generateRandomValue(colors));
        count = randomColors.length;
        sequenceGeneratorBool = true;
        pathDecide(count);
    };

    //Function to play the sequence
    async pathDecide (count) {
        countValue.innerText = count;
        for (let i of randomColors) {
            let currentColor = document.querySelector(`.${i}`);
            await delay(500);
            currentColor.style.backgroundColor = `${colors[i]["new"]}`;
            await delay(600);
            currentColor.style.backgroundColor = `${colors[i]["current"]}`;
            await delay(600);
        }
        pathGeneratorBool = false;
    };
      
}