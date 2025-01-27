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
    const table = cell.parentElement.parentElement;
    const tableSize = table.rows.length;
    let colorSize, timeout;
    
    // Determine pattern size and timeout based on table dimensions
    if (tableSize === 50) {
        colorSize = 3;
        timeout = 100;
    } else if (tableSize === 100) {
        colorSize = 5;
        timeout = 50;
    } else {
        colorSize = 1;
        timeout = 100;
    }
    
    // Get clicked cell position
    const rowIndex = cell.parentElement.rowIndex;
    const cellIndex = cell.cellIndex;
    
    // Calculate pattern boundaries
    const startRow = Math.max(0, rowIndex - Math.floor(colorSize/2));
    const endRow = Math.min(tableSize - 1, rowIndex + Math.floor(colorSize/2));
    const startCell = Math.max(0, cellIndex - Math.floor(colorSize/2));
    const endCell = Math.min(tableSize - 1, cellIndex + Math.floor(colorSize/2));
    
    // Store cells that need to fall
    let fallingCells = [];
    
    // Apply initial color pattern
    for (let i = startRow; i <= endRow; i++) {
        for (let j = startCell; j <= endCell; j++) {
            const currentCell = table.rows[i].cells[j];
            currentCell.style.backgroundColor = color;
            fallingCells.push({
                cell: currentCell,
                columnIndex: j
            });
        }
    }
    
    function processFall() {
        let stillFalling = false;
        
        fallingCells.forEach(({cell, columnIndex}) => {
            const currentRow = cell.parentElement;
            const nextRow = currentRow.nextElementSibling;
            
            if (nextRow) {
                const nextCell = nextRow.cells[columnIndex];
                if (!nextCell.style.backgroundColor) {
                    // Move the color down
                    nextCell.style.backgroundColor = color;
                    cell.style.backgroundColor = '';
                    // Update the falling cells array
                    const index = fallingCells.findIndex(item => item.cell === cell);
                    fallingCells[index] = {
                        cell: nextCell,
                        columnIndex: columnIndex
                    };
                    stillFalling = true;
                }
            }
        });
        
        if (stillFalling) {
            setTimeout(processFall, timeout);
        }
    }
    
    setTimeout(processFall, timeout);
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
    
    if (size === 100) {
        cells.forEach(cell => cell.style.padding = '3.8px');
    } else if (size === 10) {
        cells.forEach(cell => cell.style.padding = '16px');
    } else {
        cells.forEach(cell => cell.style.padding = '8px');
    }
    
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

document.addEventListener('DOMContentLoaded', () => createTable(10));