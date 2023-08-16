
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const fieldWidth = canvas.width;
const fieldHeight = canvas.height;

const ballSizeRatio = 0.012; 
const paddleWidthRatio = 0.015; 
const paddleHeightRatio = 0.2; 

let ballXRatio = 0.2; 
let ballYRatio = 0.2; 

let ballSpeedX = 0.005 * fieldWidth; 
let ballSpeedY = 0.005 * fieldHeight; 

const paddleWidth = paddleWidthRatio * fieldWidth;
const paddleHeight = paddleHeightRatio * fieldHeight;

let leftPaddleYRatio = 0.5 - (paddleHeightRatio / 2); 
let rightPaddleYRatio = 0.5 - (paddleHeightRatio / 2);
const dashLength = 10;
const gapLength = 5; 

const paddleSpeed = 0.01 * fieldHeight; 

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    KeyW: false,
    KeyS: false,
};

let leftPlayerScore = 0;
let rightPlayerScore = 0;

const scoreDiv = document.getElementById("score-holder1");
console.log("scorediv === ",scoreDiv);
scoreDiv.innerHTML = `Left Player: ${leftPlayerScore} - Right Player: ${rightPlayerScore}`;
function updateScoreDisplay() {
    scoreDiv.innerHTML = `Left Player: ${leftPlayerScore} - Right Player: ${rightPlayerScore}`;
}


document.addEventListener("keydown", (event) => {
    if (event.code in keys) {
        keys[event.code] = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code in keys) {
        keys[event.code] = false;
    }
});

function updatePaddlePositions() {
    if (keys.ArrowUp && leftPaddleYRatio > 0) {
        leftPaddleYRatio -= paddleSpeed / fieldHeight;
    }

    if (keys.ArrowDown && leftPaddleYRatio < 1 - paddleHeightRatio) {
        leftPaddleYRatio += paddleSpeed / fieldHeight;
    }

    if (keys.KeyW && rightPaddleYRatio > 0) {
        rightPaddleYRatio -= paddleSpeed / fieldHeight;
    }

    if (keys.KeyS && rightPaddleYRatio < 1 - paddleHeightRatio) {
        rightPaddleYRatio += paddleSpeed / fieldHeight;
    }
}

function checkPaddleBallCollision() {
    const ballX = ballXRatio * fieldWidth;
    const ballY = ballYRatio * fieldHeight;

    const leftPaddleY = leftPaddleYRatio * fieldHeight;
    const rightPaddleY = rightPaddleYRatio * fieldHeight;
    // Check collision with left paddle
    if (
        ballX - ballSizeRatio * fieldWidth / 2 <= paddleWidth &&
        ballY >= leftPaddleY &&
        ballY <= leftPaddleY + paddleHeight
    ) {
        ballSpeedX = Math.abs(ballSpeedX);
    }
    // Check collision with right paddle
    if (
        ballX + ballSizeRatio * fieldWidth / 2 >= fieldWidth - paddleWidth &&
        ballY >= rightPaddleY &&
        ballY <= rightPaddleY + paddleHeight
    ) {
        ballSpeedX = -Math.abs(ballSpeedX);
    }
}

function updateBallPosition() {
    ballXRatio += ballSpeedX / fieldWidth;
    ballYRatio += ballSpeedY / fieldHeight;

    if (ballXRatio < 0) {
        ballXRatio = 0;
        ballSpeedX *= -1;
        rightPlayerScore++;
        updateScoreDisplay();
        resetBall();
    } else if (ballXRatio > 1) {
        ballXRatio = 1;
        ballSpeedX *= -1;
        leftPlayerScore++;
        updateScoreDisplay();
        resetBall();
    }

    if (ballYRatio < 0 || ballYRatio > 1) {
        ballSpeedY *= -1;
    }
}

function resetBall() {
    ballXRatio = 0.5;
    ballYRatio = 0.5;
    ballSpeedX = Math.abs(ballSpeedX); // Reset to positive value
    ballSpeedY = Math.abs(ballSpeedY); // Reset to positive value
}

function drawGameObjects() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.setLineDash([dashLength, gapLength]); // Set the dash pattern

    const middleX = fieldWidth / 2;

    ctx.beginPath();
    ctx.moveTo(middleX, 0);
    ctx.lineTo(middleX, fieldHeight);
    ctx.stroke();

    ctx.setLineDash([]);
    const ballX = ballXRatio * fieldWidth;
    const ballY = ballYRatio * fieldHeight;

    const leftPaddleY = leftPaddleYRatio * fieldHeight;
    const rightPaddleY = rightPaddleYRatio * fieldHeight;

    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    ctx.fillStyle = "white";

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSizeRatio * fieldWidth, 0, Math.PI * 2);
    ctx.fill();

    // Draw left paddle
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

    // Draw right paddle
    ctx.fillRect(fieldWidth - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

function gameLoop() {
    updatePaddlePositions();
    updateBallPosition();
    checkPaddleBallCollision();
    drawGameObjects();

    requestAnimationFrame(gameLoop);
}

updateScoreDisplay(); // Initialize the score display
gameLoop();




