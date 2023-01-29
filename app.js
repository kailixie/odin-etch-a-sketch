
const grid = document.getElementById("grid");
const sidebar = document.getElementById("sidebar");

// Grid creation based on input
function createGrid(cellNum) {
    grid.style.gridTemplateColumns = `repeat(${cellNum}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${cellNum}, 1fr)`;
    for (let i = 0; i < (cellNum * cellNum); i++) {
        let cell = document.createElement("div")
        cell.classList.add("cell")
        grid.appendChild(cell)
    }
};

const rangeSlider = document.querySelector("#rangeSlider");
const sliderText = document.getElementById("sliderText");

function clearGrid() {
    
}

function changeGridSize() {
    newRangeSize = rangeSlider.value
    // updateSliderText();
    createGrid(newRangeSize);
    console.log(newRangeSize)
};

function updateSliderText(newRangeSize) {
    sliderText.innerHTML = `Grid Size: ${newRangeSize} x ${newRangeSize}`;
};

rangeSlider.addEventListener('change', changeGridSize);



//default size
window.onload = createGrid(16)