let mode = 'spread';

function setMode(newMode) {
    mode = newMode;
    console.log('Mode set to:', mode);
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
        });
}

function getAdjacentCells(cell) {
    const row = cell.parentElement;
    const table = row.parentElement;
    const cellIndex = Array.from(row.children).indexOf(cell);
    const rowIndex = Array.from(table.children).indexOf(row);

    const adjacentCells = [];

    if (row.previousElementSibling) {
        adjacentCells.push(row.previousElementSibling.children[cellIndex]);
    }
    if (row.nextElementSibling) {
        adjacentCells.push(row.nextElementSibling.children[cellIndex]);
    }
    if (cell.previousElementSibling) {
        adjacentCells.push(cell.previousElementSibling);
    }
    if (cell.nextElementSibling) {
        adjacentCells.push(cell.nextElementSibling);
    }

    return adjacentCells;
}

function getHexFromSplash(splash) {
    const splashChannels = splash.toString().padStart(3, "0").split("")
    const rgbChannels = splashChannels.map((v) => Math.floor((v / 9) * 255))
    const hexChannels = rgbChannels.map((v) => v.toString(16).padStart(2, "0"))
    return "#" + hexChannels.join("")
}

function getRandomColor() {
    const splash = Math.floor(Math.random() * 1000);
    return getHexFromSplash(splash);
}

function spreadColor(cell, color) {
    const queue = [cell];
    const visited = new Set();

    function processQueue() {
        if (queue.length === 0) return;

        const currentCell = queue.shift();
        if (currentCell && !visited.has(currentCell)) {
            currentCell.style.backgroundColor = color;
            visited.add(currentCell);

            const adjacentCells = getAdjacentCells(currentCell);
            adjacentCells.forEach(adjacentCell => {
                if (!visited.has(adjacentCell) && adjacentCell.style.backgroundColor !== color) {
                    queue.push(adjacentCell);
                }
            });
        }

        setTimeout(processQueue, 5);
    }

    processQueue();
}

function fallColor(cell, color) {
    let currentCell = cell;
    
    function processFall() {
        const row = currentCell.parentElement;
        const table = row.parentElement;
        const cellIndex = Array.from(row.children).indexOf(currentCell);
        const nextRow = row.nextElementSibling;

        // If there's a next row and its cell is empty
        if (nextRow) {
            const nextCell = nextRow.children[cellIndex];
            if (!nextCell.style.backgroundColor) {
                // Move the color down
                nextCell.style.backgroundColor = color;
                currentCell.style.backgroundColor = '';
                currentCell = nextCell;
                setTimeout(processFall, 100);
            }
        }
    }

    // Set initial color
    currentCell.style.backgroundColor = color;
    setTimeout(processFall, 100);
}

function createTable(size) {
    const table = document.getElementById('grid');
    table.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const cells = document.querySelectorAll('td');
    
    // Set cell padding based on grid size
    if (size === 100) {
        cells.forEach(cell => cell.style.padding = '3.8px');
    } else if (size === 10) {
        cells.forEach(cell => cell.style.padding = '16px');
    } else {
        cells.forEach(cell => cell.style.padding = '8px');
    }
    
    // Add click event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const color = getRandomColor();
            if (mode === 'spread') {
                spreadColor(cell, color);
            } else if (mode === 'fall') {
                fallColor(cell, color);
            }
        });
    });
}

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', () => createTable(10));