
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const fieldWidth = canvas.width;
const fieldHeight = canvas.height;

const ballSizeRatio = 0.012; 
const paddleWidthRatio = 0.020; 
const paddleHeightRatio = 0.2; 

let ballXRatio = 0.2; 
let ballYRatio = 0.2; 

let ballSpeedX = 0.005 * fieldWidth; 
let ballSpeedY = 0.005 * fieldHeight; 

const paddleWidth = paddleWidthRatio * fieldWidth;
const paddleHeight = paddleHeightRatio * fieldHeight;

let leftPaddleYRatio = 0.5 - (paddleHeightRatio / 2); 
let rightPaddleYRatio = 0.5 - (paddleHeightRatio / 2);
const gameEnded = false;

const paddleSpeed = 0.01 * fieldHeight; 

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    KeyW: false,
    KeyS: false,
};

let leftPlayerScore = 0;
let rightPlayerScore = 0;

const scoreSpan1 = document.getElementById("player1Score");
const scoreSpan2 = document.getElementById("player2Score");

function updateScoreDisplay() {
    scoreSpan1.innerHTML = `${leftPlayerScore}`;
    scoreSpan2.innerHTML = `${rightPlayerScore}`;
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

let ballSpeedFactor = 1; 
function endGame(score1, score2){
    if (score1+ score2 === 2){
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
        gameEnded = true;
        //gotta end the game here lol
    }
}
const maxBallSpeedX = 0.009 * fieldWidth; // Adjust as needed
const maxBallSpeedY = 0.009 * fieldHeight; // Adjust as needed
const maxBallSpeedFactor = 3;
function updateBallPosition() {
    endGame(leftPlayerScore,rightPlayerScore);
    ballXRatio += ballSpeedX / fieldWidth;
    ballYRatio += ballSpeedY / fieldHeight;

    if (ballXRatio < 0) {
        ballXRatio = 0;
        ballSpeedX = Math.min(Math.abs(ballSpeedX) * ballSpeedFactor, maxBallSpeedX);
        rightPlayerScore++;
        updateScoreDisplay();
        resetBall();
    } else if (ballXRatio > 1) {
        ballXRatio = 1;
        ballSpeedX = -Math.min(Math.abs(ballSpeedX) * ballSpeedFactor, maxBallSpeedX);
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
    ballSpeedX = Math.sign(ballSpeedX) * (Math.abs(ballSpeedX) + 0.001); // Increase speed slightly
    ballSpeedY = Math.sign(ballSpeedY) * (Math.abs(ballSpeedY) + 0.001); // Increase speed slightly
    ballSpeedFactor = Math.min(ballSpeedFactor + 0.1, maxBallSpeedFactor); // Increase speed factor with limit
}

function drawGameObjects() {
    
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 20;
    ctx.lineWidth = 2;
    const ballX = ballXRatio * fieldWidth;
    const ballY = ballYRatio * fieldHeight;
    const leftPaddleY = leftPaddleYRatio * fieldHeight;
    const rightPaddleY = rightPaddleYRatio * fieldHeight;
    
    ctx.clearRect(0, 0, fieldWidth, fieldHeight);
    ctx.fillStyle = "white";
// draw dashed line
    var middleX = canvas.width / 2;
    ctx.strokeStyle = "#265bea";
    ctx.lineWidth = 20;
    ctx.setLineDash([30, 31]); 
    ctx.beginPath();
    ctx.moveTo(middleX, 0);
    ctx.lineTo(middleX, canvas.height);
    ctx.stroke(); 
    ctx.setLineDash([]);
    //end dashed line
    ctx.lineWidth = 2;
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSizeRatio * fieldWidth, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = "#32ff6a";
    ctx.shadowBlur = 60;
    ctx.fillStyle = "#32ff6a";
    // Draw left paddle
    ctx.fillRect(20, leftPaddleY, paddleWidth, paddleHeight);
    // Draw right paddle
    ctx.fillRect(fieldWidth - paddleWidth - 20, rightPaddleY, paddleWidth, paddleHeight);
}

function gameLoop() {
    if (gameEnded){
        ballSpeedX = 0; 
        ballSpeedY = 0;
    }
    updatePaddlePositions();
    updateBallPosition();
    checkPaddleBallCollision();
    drawGameObjects();
    requestAnimationFrame(gameLoop);
}

updateScoreDisplay();
gameLoop();




