//game constants and variable
let input_direction = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOver = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const speed = 12;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 3, y: 5 };
let scorecard = 0;





















//game functions
function main(ctime) {
    // console.log(ctime);

    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        // FOR CONTROLLING SPEED OF REFRESH
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        //if snake goes into itself
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    // if snake strikes with wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }

    return false;
}
function updatescore(scorecard) {
    let score = document.getElementById('score');
    score.innerHTML = "SCORE: " + scorecard;
}
function gameEngine() {
    //STEP1->UPDATE SNAKE ARRAY
    if (isCollide(snakeArr)) {
        gameOver.play();
        musicSound.pause();
        input_direction = { x: 0, y: 0 };
        alert("Game Over😢😢😢 Press Any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        scorecard = 0;
        updatescore(scorecard);

    }

    // if eated food , score=score+1 and regenerate the food
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        foodSound.play();
        let a = 1;
        let b = 16;

        scorecard = scorecard + 1;
        updatescore(scorecard);
        if (scorecard > highscoreval) {
            highscoreval = scorecard;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            let highestscore = document.getElementById('highestscore');
            highestscore.innerHTML = "HIGHSCORE: " + highscoreval;
        }
        //y head ko ek shift krke add krega
        snakeArr.unshift({ x: snakeArr[0].x + input_direction.x, y: snakeArr[0].y + input_direction.y });
        // now update new location
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += input_direction.x;
    snakeArr[0].y += input_direction.y;






    // DISPLAY OF SNAKE 
    let curr_board = document.getElementById('board');
    curr_board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        //STEP2-> RENDER SNAKE 
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        curr_board.appendChild(snakeElement);

    })

    //STEP3->RENDER FOOD 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    curr_board.appendChild(foodElement);
}






/*******main logic starts here *******/

let highscore = localStorage.getItem('highscore');
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));

}
else {
    highscoreval = JSON.parse(highscore);
    let highestscore = document.getElementById('highestscore');
    highestscore.innerHTML = "HIGHSCORE: " + highscoreval;

}
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    input_velocity = { x: 0, y: 2 }; // game started here
    moveSound.play();
    musicSound.play();
    // which key is pressed
    //origin is the poijnt is top left ..... x->    y -> lower
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            input_direction.x = 0;
            input_direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            input_direction.x = 0;
            input_direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            input_direction.x = -1;
            input_direction.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            input_direction.x = 1;
            input_direction.y = 0;
            break;
        case "w":
            console.log("ArrowUp");
            input_direction.x = 0;
            input_direction.y = -1;
            break;
        case "s":
            console.log("ArrowDown");
            input_direction.x = 0;
            input_direction.y = 1;
            break;
        case "a":
            console.log("ArrowLeft");
            input_direction.x = -1;
            input_direction.y = 0;
            break;
        case "d":
            console.log("ArrowRight");
            input_direction.x = 1;
            input_direction.y = 0;
            break;
        default:
            break;

    }
})