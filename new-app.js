//INITIAL: 
const sidebar = document.querySelector(".sidebar")
const grid = document.querySelector(".grid");
const clearBtn = document.getElementById("clearBtn");
const darkBtn = document.getElementById("darkenBtn");
const lightBtn = document.getElementById("lightenBtn");

let cells = [];


// CONTROLS: 

// Range Bar & Text for Grid Size:
let rangeSlider = document.querySelector("#rangeSlider");
rangeSlider.value = 16;

let sliderText = document.querySelector("#slideText");
sliderText.textContent = `Grid Size: ${rangeSlider.value} x ${rangeSlider.value}`;
rangeSlider.addEventListener("mousemove", function () {
    sliderText.textContent = `Grid Size: ${rangeSlider.value} x ${rangeSlider.value}`;
})

// Color & Color Selectors:

let currentPenColor = "black";
let currentBgColor = "rgba(255, 255, 255, 0)";

let penColorPicker = document.querySelector("#penColorPicker")
penColorPicker.addEventListener("change", function() {
    let newPenColor = penColorPicker.value;
})

let bgColorPicker = document.querySelector("#backgroundColorPicker")
bgColorPicker.addEventListener("change", function() {
    let newBgColor = bgColorPicker.value;
})


//



// FUNCTIONS:

// Clear Grid:
function clearGrid () {
    let gridCells = grid.querySelectorAll("div");
    gridCells.forEach(gridCell => {
        gridCell.style = "background-color: rgba(255, 255, 255, 0)";
    });
}

// Change Grid Size:
function changeGridSize() {
    let gridCells = grid.querySelectorAll("div");
    gridCells.forEach(gridCell => gridCell.remove());
    createGrid(rangeSlider.value);
}

// Create Grid: 
function createGrid() {
    let cellNum = rangeSlider.value;
    for (let i = 0; i < (cellNum * cellNum); i++) {
        grid.style.gridTemplateColumns = `repeat(${cellNum}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${cellNum}, 1fr)`;
        cells[i] = document.createElement("div");
        cells[i].classList.add("cells");
        grid.appendChild(cells[i]);
    
    var gridCells = grid.querySelectorAll("div");
    }
}

rangeSlider.addEventListener("change", function() {
    changeGridSize(rangeSlider.value);
})

// Random Color: 


// Incrementally Darker:


// Incrementally Lighter:


// EVENT LISTENERS:

// Move Slider:


//ON LOAD DEFAULT:

window.onload = () => {
    createGrid(16)
}