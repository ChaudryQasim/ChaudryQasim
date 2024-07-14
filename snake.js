const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 16; // Adjusted for a smaller playing area
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box }; // Start the snake in the center

let direction;
let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
};

document.addEventListener("keydown", directionChange);
document.getElementById("up").addEventListener("click", () => directionChange({ keyCode: 38 }));
document.getElementById("down").addEventListener("click", () => directionChange({ keyCode: 40 }));
document.getElementById("left").addEventListener("click", () => directionChange({ keyCode: 37 }));
document.getElementById("right").addEventListener("click", () => directionChange({ keyCode: 39 }));

function directionChange(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

function collision(newHead, array) {
    for (let i = 0; i < array.length; i++) {
        if (newHead.x === array[i].x && newHead.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "darkgreen" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Check for collision with walls and snake body
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 100);
