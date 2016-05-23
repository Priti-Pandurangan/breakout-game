var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var ballRadius = 10

var x = canvas.width / 2
var y = canvas.height - 30

var dx = 2
var dy = -2

var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth) / 2

var rightPressed = false
var leftPressed = false

var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30

var bricks = []
var score = 0

for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for(r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
    }
}

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true
    }
    else if(event.keyCode == 37) {
        leftPressed = true
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false
    }
    else if (event.keyCode == 37) {
        leftPressed = false
    }
}

function collisionDetection() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r]
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                    score++
                    if (score == brickRowCount * brickColumnCount) {
                      alert("Congratulations, You Win!!")
                      document.location.reload()  
                    }
                } 
            }    
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial"
    ctx.fillStyle = "#12132B"
    ctx.fillText("Your score is: " +score, 8, 20)
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#12132B"
    ctx.fill()
    ctx.closePath()   
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, 
    canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#12132B"
    ctx.fill()
    ctx.closePath()
}

function drawBricks() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
     
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
     
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = "#12132B"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBricks()
    drawBall()
    drawPaddle()
    drawScore()
    collisionDetection()
    

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
    }
    if (y + dy < ballRadius) {
        dy = -dy
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy
            }
        }
        else {
            alert("Game Over")
            document.location.reload()
        }
    }

    if (rightPressed && paddleX < (canvas.width - paddleWidth)) { 
            paddleX += 7
    }
    else if (leftPressed && paddleX > 0) { 
        paddleX -= 7
    } 

    x += dx
    y += dy
}

setInterval(draw, 10)