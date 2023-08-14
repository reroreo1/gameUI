const rightPaddle = document.getElementById("right-paddle");
// console.log("right paddle ====", rightPaddle);
const leftPaddle = document.getElementById("left-paddle");
// console.log("right paddle ====", leftPaddle);
const canvasElement = document.getElementById("canva1");
// console.log("canva === ",canvasElement);
const canvasHeightString = getComputedStyle(canvasElement).height;
const canvasHeight = parseInt(canvasHeightString, 10);
console.log("canvasHeight === ", canvasHeight);
const computedStyle = getComputedStyle(leftPaddle);
const paddleHeightString = computedStyle.height;
const paddleHeight = parseInt(paddleHeightString, 10);
console.log("paddleHeight === ", paddleHeight);
function movePaddle(event) {
    const keyCode = event.keyCode;

    console.log(rightPaddle.style.top);
    // Move left paddle
    if (keyCode === 38) { // Up arrow
      if()   
        rightPaddle.style.top = (parseInt(rightPaddle.style.top) - 10).toString() +"px";
    } else if (keyCode === 40) { // Down arrow
        rightPaddle.style.top = (parseInt(rightPaddle.style.top) + 10).toString() +"px";
    }
    // leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvas.height - paddleHeight));
    rightPaddle.style.top = (Math.max(0, Math.min(rightPaddle.style.top, canvasHeight - paddleHeight))).toString() + "px";
}
document.addEventListener("keydown",movePaddle,false);

let ball = document.getElementById("ball");
// let scoreLeft = 0; //score for player one
// let scoreRight = 0; //score for player two
let scoreLeft = document.getElementById("score-left");
let scoreRight = document.getElementById("score-right");

// let ballX = 0;
// let ballY = 0;
// let ballSpeedX = 5;
// let ballSpeedY = 5;

// let paddleSpeed = 10;

// let gameLoop = setInterval(update, 1000 / 60);

// function update() {
//     // console.log("update");
//     // console.log(ballX, ballY);
//     ballX += ballSpeedX;
//     ballY += ballSpeedY;
    
//     if (ballX > 1000) {
//         ballSpeedX *= -1;
//         scoreLeft++;
//         scoreLeft.innerHTML = scoreLeft;
//     }
//     if (ballX < 0) {
//         ballSpeedX *= -1;
//         scoreRight++;
//         scoreRight.innerHTML = scoreRight;
//     }
//     if (ballY > 500) {
//         ballSpeedY *= -1;
//     }
//     if (ballY < 0) {
//         ballSpeedY *= -1;
//     }
    
//     ball.style.left = ballX + "px";
//     ball.style.top = ballY + "px";
// }

