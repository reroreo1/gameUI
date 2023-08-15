const rightPaddle = document.getElementById("right-paddle");
const leftPaddle = document.getElementById("left-paddle");
const scoreLeft = document.getElementById("score-left");
const scoreRight = document.getElementById("score-right");
const ballElement = document.getElementById("ball1");
const paddleSpeed = 2;
const initPaddlePos = 50;

let gameData = {
    players: {
        left: {
            y: initPaddlePos,
            score: 0
        },
        right: {
            y: initPaddlePos,
            score: 0
        }
    },
    ball: {
        ballY: 50,
        ballX: 50,
    }
}
let ballSpeedX =  1;
let ballSpeedY =  5;
let keysArr = {
    w: false,
    s: false,
    up: false,
    down: false
};


function keysHandler(event) {
    let isPressed = event.type == "keydown";
    switch (event.code) {
        case "KeyS":
            keysArr.s = isPressed;
            break;
        case "KeyW":
            keysArr.w = isPressed;
            break;
        case "ArrowUp":
            keysArr.up = isPressed;
            break;
        case "ArrowDown":
            keysArr.down = isPressed;
            break;
    }
}
document.addEventListener("keydown", keysHandler, false);
document.addEventListener("keyup", keysHandler, false);

let gameLoop = setInterval(updateUI, 1000 / 60);
let paddlesup = setInterval(updateGameData, 1000 / 128);


function updateGameData() {
    if (gameData.ball.ballX + ballSpeedX <= 100 && gameData.ball.ballX - ballSpeedX >= 0) 
        gameData.ball.ballX -= ballSpeedX;
    // gameData.ball.ballY += ballSpeedY;
    if (keysArr.down) { // Up arrow
        if (gameData.players.left.y + paddleSpeed <= 100)
            gameData.players.left.y += paddleSpeed;
    }
    if (keysArr.up) { // Down arrow
        if (gameData.players.left.y - paddleSpeed >= 0)
            gameData.players.left.y -= paddleSpeed;
    }
    if (keysArr.s) { // Up arrow
        if (gameData.players.right.y + paddleSpeed <= 100)
            gameData.players.right.y += paddleSpeed;
    }
    if (keysArr.w) { // Down arrow
        if (gameData.players.right.y - paddleSpeed >= 0)
            gameData.players.right.y -= paddleSpeed;
    }

}

function updateUI() {
    rightPaddle.style.transform = `translateY(${(gameData.players.right.y - 50) * 4}%)`;
    leftPaddle.style.transform = `translateY(${(gameData.players.left.y - 50) * 4}%)`;
    ballElement.style.transform = `translateX(${(gameData.ball.ballX - 50) * 2967.48 / 100 }%)`;
}
