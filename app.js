

const grid = document.getElementById("grid")
const sidebar = document.getElementsById("sidebar")

// Grid creation based on input
function createGrid(cellNum) {
    grid.style.gridTemplateColumns = `repeat(${cellNum}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${cellNum}, 1fr)`;
    for (let i = 0; i < (cellNum * cellNum); i++) {
        let cell = document.createElement("div")
        cell.classList.add("cell")
        grid.appendChild(cell)
    }
}

createGrid(50)