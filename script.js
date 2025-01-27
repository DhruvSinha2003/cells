document.addEventListener('DOMContentLoaded', (event) => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.style.backgroundColor = 'red'; 
        });
    });
});