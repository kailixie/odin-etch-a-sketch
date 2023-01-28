// Create 16x16 grid

const grid = document.getElementById("grid")

function createGrid(rows, columns) {
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    for (let i = 0; i < (rows * columns); i++) {
        let cell = document.createElement("div")
        cell.classList.add("cell")
        grid.appendChild(cell)
    }
    grid.style.w
}

createGrid(16, 16)