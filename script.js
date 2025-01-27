// const cells = document.querySelectorAll("td");
// for (const cell of cells) {
//   cell.style.backgroundColor = Math.random() > 0.5 ? "black" : "white";
// }

// document.addEventListener('DOMContentLoaded', (event) => {
//     const cells = document.querySelectorAll('td');
//     cells.forEach(cell => {
//         cell.addEventListener('click', () => {
//             cell.style.backgroundColor = 'red'; 
//         });
//     });
// });

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

// document.addEventListener('DOMContentLoaded', (event) => {
//     const cells = document.querySelectorAll('td');
//     cells.forEach(cell => {
//         cell.addEventListener('click', () => {
//             cell.style.backgroundColor = 'red';
//             const adjacentCells = getAdjacentCells(cell);
//             adjacentCells.forEach(adjacentCell => {
//                 adjacentCell.style.backgroundColor = 'red';
//             });
//         });
//     });
// });


function getHexFromSplash(splash) {
    // Pull out the channels into an array
    const splashChannels = splash.toString().padStart(3, "0").split("")

    // Remap from "0 to 9" to "0 to 255"
    const rgbChannels = splashChannels.map((v) => Math.floor((v / 9) * 255))

    // Convert to hexadecimal
    const hexChannels = rgbChannels.map((v) => v.toString(16).padStart(2, "0"))
    return "#" + hexChannels.join("")
}

function getRandomColor() {
    const splash = Math.floor(Math.random() * 1000);
    return getHexFromSplash(splash);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            spreadColor(cell, getRandomColor());
        });
    });
});

// const cells = document.querySelectorAll("td");
// for (const cell of cells) {
//   cell.style.backgroundColor = Math.random() > 0.5 ? "black" : "white";
// }

// document.addEventListener('DOMContentLoaded', (event) => {
//     const cells = document.querySelectorAll('td');
//     cells.forEach(cell => {
//         cell.addEventListener('click', () => {
//             cell.style.backgroundColor = 'red'; 
//         });
//     });
// });

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

// document.addEventListener('DOMContentLoaded', (event) => {
//     const cells = document.querySelectorAll('td');
//     cells.forEach(cell => {
//         cell.addEventListener('click', () => {
//             cell.style.backgroundColor = 'red';
//             const adjacentCells = getAdjacentCells(cell);
//             adjacentCells.forEach(adjacentCell => {
//                 adjacentCell.style.backgroundColor = 'red';
//             });
//         });
//     });
// });


function getHexFromSplash(splash) {
    // Pull out the channels into an array
    const splashChannels = splash.toString().padStart(3, "0").split("")

    // Remap from "0 to 9" to "0 to 255"
    const rgbChannels = splashChannels.map((v) => Math.floor((v / 9) * 255))

    // Convert to hexadecimal
    const hexChannels = rgbChannels.map((v) => v.toString(16).padStart(2, "0"))
    return "#" + hexChannels.join("")
}

function getRandomColor() {
    const splash = Math.floor(Math.random() * 1000);
    return getHexFromSplash(splash);
}

// function spreadColor(cell, color) {
//     cell.style.backgroundColor = color;
//     const adjacentCells = getAdjacentCells(cell);
//     setTimeout(() => {
//         adjacentCells.forEach(adjacentCell => {
//             if (adjacentCell.style.backgroundColor !== color) {
//                 spreadColor(adjacentCell, color);
//             }
//         });
//     }, 300); 
// }

function spreadColor(cell, color) {
    const queue = [cell]; // Initialize a queue with the starting cell
    const visited = new Set(); // Keep track of processed cells to avoid duplicates

    function processQueue() {
        if (queue.length === 0) return; // Stop when the queue is empty

        const currentCell = queue.shift(); // Dequeue the next cell to process
        if (currentCell && !visited.has(currentCell)) {
            currentCell.style.backgroundColor = color; // Apply the color to the cell
            visited.add(currentCell); // Mark the cell as visited

            const adjacentCells = getAdjacentCells(currentCell); // Get neighboring cells
            adjacentCells.forEach(adjacentCell => {
                // Add unvisited and differently colored cells to the queue
                if (!visited.has(adjacentCell) && adjacentCell.style.backgroundColor !== color) {
                    queue.push(adjacentCell);
                }
            });
        }

        setTimeout(processQueue, 50); // Process the next "wave" of cells after a delay
    }

    processQueue(); // Start the spreading process
}



document.addEventListener('DOMContentLoaded', (event) => {
    const cells = document.querySelectorAll('td');
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            spreadColor(cell, getRandomColor());
        });
    });
});