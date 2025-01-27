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

function spreadColor(cell, color) {
    cell.style.backgroundColor = color;
    const adjacentCells = getAdjacentCells(cell);
    setTimeout(() => {
        adjacentCells.forEach(adjacentCell => {
            if (adjacentCell.style.backgroundColor !== color) {
                spreadColor(adjacentCell, color);
            }
        });
    }, 300); 
}

document.addEventListener('DOMContentLoaded', (event) => {
    const cells = document.querySelectorAll('td');
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            spreadColor(cell, getRandomColor());
        });
    });
});