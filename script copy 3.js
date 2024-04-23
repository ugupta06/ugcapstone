document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('minesweeper');
    const size = 10; // This will create a 10x10 grid
    const mineCount = 15;
    let cells;
    let cellElements;

    function init() {
        gridElement.style.gridTemplateColumns = `repeat(${size}, 30px)`;
        cells = [];
        cellElements = [];

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            gridElement.appendChild(cell);
            cellElements.push(cell);

            cells.push({
                mine: false,
                revealed: false,
                flagged: false
            });
        }

        // Place mines
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const index = Math.floor(Math.random() * size * size);
            if (!cells[index].mine) {
                cells[index].mine = true;
                minesPlaced++;
            }
        }

        cellElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                revealCell(index);
            });

            element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                flagCell(index);
            });
        });
    }

    function revealCell(index) {
        const cell = cells[index];
        const element = cellElements[index];

        if (cell.revealed || cell.flagged) return;
        cell.revealed = true;
        element.style.backgroundColor = '#bbb';

        if (cell.mine) {
            element.textContent = '💣';
            gameOver();
            return;
        }

        const adjacentMines = countAdjacentMines(index);
        if (adjacentMines > 0) {
            element.textContent = adjacentMines;
            return;
        }

        // Reveal surrounding cells
        setTimeout(() => {
            getAdjacentCells(index).forEach(revealCell);
        }, 10);
    }

    function flagCell(index) {
        const cell = cells[index];
        const element = cellElements[index];

        if (cell.revealed) return;

        if (!cell.flagged) {
            element.textContent = '🚩';
            cell.flagged = true;
        } else {
            element.textContent = '';
            cell.flagged = false;
        }
    }

    function countAdjacentMines(index) {
        const row = Math.floor(index / size);
        const col = index % size;
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                const newIndex = newRow * size + newCol;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && cells[newIndex].mine) {
                    count++;
                }
            }
        }

        return count;
    }

    function getAdjacentCells(index) {
        const row = Math.floor(index / size);
        const col = index % size;
        const indices = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                const newIndex = newRow * size + newCol;
                if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && !cells[newIndex].revealed) {
                    indices.push(newIndex);
                }
            }
        }

        return indices;
    }

    function gameOver() {
        alert('Game Over! Resetting...');
        init(); // Reset the game
    }

    init();
});
