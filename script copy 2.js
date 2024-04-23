document.addEventListener('DOMContentLoaded', function() {
    const bird = document.getElementById('bird');
    const gameContainer = document.getElementById('gameContainer');
    const scoreDisplay = document.getElementById('score');
    let birdY = 150;
    let gravity = 2;
    let gameRunning = true;
    let score = 0;
    let pipes = [];

    function gameLoop() {
        if (gameRunning) {
            birdY += gravity;
            bird.style.top = birdY + 'px';
            movePipes();
            checkCollision();
            requestAnimationFrame(gameLoop);
        }
    }

    function movePipes() {
        pipes.forEach(pipe => {
            let x = parseInt(pipe.style.left);
            x -= 2;
            pipe.style.left = x + 'px';

            if (x + 60 < 0) {
                pipe.remove();
                pipes.shift();
                updateScore();
            }
        });

        if (pipes.length === 0 || parseInt(pipes[pipes.length - 1].style.left) < 200) {
            createPipe();
        }
    }

    function createPipe() {
        const pipeSpacing = 150;
        const pipeTopHeight = Math.floor(Math.random() * (250 - 50 + 1) + 50);
        const pipeBottomHeight = 480 - pipeTopHeight - pipeSpacing;

        const pipeTop = document.createElement('div');
        pipeTop.className = 'pipe upperPipe';
        pipeTop.style.height = pipeTopHeight + 'px';
        pipeTop.style.left = '320px';
        gameContainer.appendChild(pipeTop);

        const pipeBottom = document.createElement('div');
        pipeBottom.className = 'pipe';
        pipeBottom.style.height = pipeBottomHeight + 'px';
        pipeBottom.style.top = pipeTopHeight + pipeSpacing + 'px';
        pipeBottom.style.left = '320px';
        gameContainer.appendChild(pipeBottom);

        pipes.push(pipeTop, pipeBottom);
    }

    function checkCollision() {
        const birdRect = bird.getBoundingClientRect();
        const groundRect = document.getElementById('ground').getBoundingClientRect();
        const isGroundCollision = birdRect.bottom >= groundRect.top;

        const isPipeCollision = pipes.some(pipe => {
            const pipeRect = pipe.getBoundingClientRect();
            return birdRect.left < pipeRect.right &&
                   birdRect.right > pipeRect.left &&
                   birdRect.top < pipeRect.bottom &&
                   birdRect.bottom > pipeRect.top;
        });

        if (isGroundCollision || isPipeCollision) {
            gameRunning = false;
            alert('Game Over!');
        }
    }

    function jump() {
        if (birdY > 20) {
            birdY -= 60;
        }
    }

    function updateScore() {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) { // Space key
            jump();
        }
    });

    gameLoop();
});
