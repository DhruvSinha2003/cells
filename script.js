const cells = document.querySelectorAll("td");
for (const cell of cells) {
  cell.style.backgroundColor = Math.random() > 0.5 ? "black" : "white";
}

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

document.addEventListener('DOMContentLoaded', (event) => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.style.backgroundColor = 'red';
            const adjacentCells = getAdjacentCells(cell);
            adjacentCells.forEach(adjacentCell => {
                adjacentCell.style.backgroundColor = 'red';
            });
        });
    });
});