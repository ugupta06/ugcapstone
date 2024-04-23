const gameArea = document.getElementById('gameArea');
const context = gameArea.getContext('2d');
const grid = 20; // this sets the size of the grid cells
let speed = 7;

let snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
let dx = grid; // horizontal movement
let dy = 0; // vertical movement
let food = { x: 0, y: 0 };
let score = 0;

const getRandomFoodPosition = () => {
    let x = Math.floor(Math.random() * (gameArea.width / grid)) * grid;
    let y = Math.floor(Math.random() * (gameArea.height / grid)) * grid;
    // Check if the random position is not where the snake currently is
    if (snake.some(segment => segment.x === x && segment.y === y)) {
        return getRandomFoodPosition();
    }
    return { x, y };
};

const drawFood = () => {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, grid, grid);
};

const drawSnake = () => {
    context.fillStyle = 'green';
    snake.forEach(segment => {
        context.fillRect(segment.x, segment.y, grid, grid);
    });
};

const moveSnake = () => {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake has eaten the food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
};

const changeDirection = (event) => {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    switch (keyPressed) {
        case LEFT:
            if (dx === 0) {
                dx = -grid;
                dy = 0;
            }
            break;
        case UP:
            if (dy === 0) {
                dx = 0;
                dy = -grid;
            }
            break;
        case RIGHT:
            if (dx === 0) {
                dx = grid;
                dy = 0;
            }
            break;
        case DOWN:
            if (dy === 0) {
                dx = 0;
                dy = grid;
            }
            break;
    }
};

const checkGameOver = () => {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameArea.width - grid;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameArea.height - grid;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
};

const clearCanvas = () => {
    context.clearRect(0, 0, gameArea.width, gameArea.height);
};

const gameLoop = () => {
    if (checkGameOver()) {
        alert('Game over');
        document.location.reload();
        return;
    }

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();

    setTimeout(gameLoop, 1000 / speed);
};

document.addEventListener('keydown', changeDirection);
food = getRandomFoodPosition();
gameLoop();
