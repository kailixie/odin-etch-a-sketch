//INITIAL: 
const sidebar = document.querySelector(".sidebar")
const grid = document.querySelector(".grid");
const clearBtn = document.getElementById("clearBtn");
const darkBtn = document.getElementById("darkenBtn");
const lightBtn = document.getElementById("lightenBtn");

var gridCells = grid.querySelectorAll("div");

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

// Pen Color:

let defaultPenColor = "rgba(0, 0, 0, 1)";
let defaultBgColor = "rgba(255, 255, 255, 1)";

let penColorPicker = document.querySelector("#penColorPicker")
penColorPicker.addEventListener("input", (e) => {
    newPenColor = e.target.value;
    usePen();
})

// Background Color: 
let bgColorPicker = document.querySelector("#backgroundColorPicker")
bgColorPicker.addEventListener("input", (e) => {
    newBgColor = e.target.value;
    grid.style.backgroundColor = newBgColor;
})


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
    

    }
}


// Adding Color:

function colorGrid() {
    cells.target.style.backgroundColor = penColorPicker.value;
}

function usePen() {
    let gridCells = grid.querySelectorAll("div");
    gridCells.forEach(gridCell => gridCell.addEventListener("mouseenter", function() {
        gridCell.style.backgroundColor = penColorPicker.value;
    })
)}

// Random Color: 


// Incrementally Darker:


// Incrementally Lighter:


// EVENT LISTENERS:

// Move Slider:
rangeSlider.addEventListener("change", function() {
    changeGridSize(rangeSlider.value);
})




//ON LOAD DEFAULT:

window.onload = () => {
    createGrid(16)
}