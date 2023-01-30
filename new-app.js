//INITIAL: 
const sidebar = document.querySelector(".sidebar")
const grid = document.querySelector(".grid");
const penColorPicker = document.querySelector("#penColorPicker");
const bgColorPicker = document.querySelector("#backgroundColorPicker");
const solidBtn = document.getElementById("solidBtn");
const redBtn = document.getElementById("redBtn");
const blueBtn = document.getElementById("blueBtn");
const greenBtn = document.getElementById("greenBtn");
const darkBtn = document.getElementById("darkenBtn");
const lightBtn = document.getElementById("lightenBtn");
const clearBtn = document.getElementById("clearBtn");
const eraseBtn = document.getElementById("eraseBtn");

let cells = [];

// GRID: 

// Range Bar & Text for Grid Size:
const rangeSlider = document.querySelector("#rangeSlider");
rangeSlider.value = 50;

const sliderText = document.querySelector("#slideText");
sliderText.textContent = `Grid Size: ${rangeSlider.value} x ${rangeSlider.value}`;
rangeSlider.addEventListener("mousemove", function () {
    sliderText.textContent = `Grid Size: ${rangeSlider.value} x ${rangeSlider.value}`;
})

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

// PEN COLOR:

function usePen(colorMode, colors) {
    let gridCells = grid.querySelectorAll("div");
    gridCells.forEach((gridCell) => {
        if (colorMode === "redMode" || colorMode === "blueMode" || colorMode === "greenMode"){
            const randomColor = colors[Math.floor(Math.random() * colors.length,)];
            gridCell.addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = randomColor;
                e.target.setAttribute("data-inked", "true");
                e.target.removeAttribute("data-shaded");
            });
        } else if (colorMode === "solidMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = colors;
                e.target.setAttribute("data-inked", "true");
                e.target.removeAttribute("data-shaded");
            });
        } else if (colorMode === "eraseMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = "";
                e.target.removeAttribute("data-inked");
                e.target.removeAttribute("data-shaded");
            });
        } else if (colorMode === "darkMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                // e.target.style.opacity += 0.1
            });
        } else if (colorMode === "lightMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                // e.target.style.opacity -= 0.1
            });
        }
    })
}


// Button Selection:

const modeButtons = document.querySelectorAll(".colorMode");

function removeCurrentMode(buttons) {
    buttons.forEach((button) => {
        button.classList.remove("btn-on");
    });
}

function chooseColorMode() {
    const modeButtons = document.querySelectorAll(".colorMode");
    modeButtons.forEach((modeButton) => {
        modeButton.addEventListener("click", () => {
            removeCurrentMode(modeButtons);
            if (modeButton.id === "redBtn") {
                redBtn.classList.add("btn-on");
                usePen("redMode", ['rgb(104,1,8)', 'rgb(149,2,11)', 'rgb(156,29,24)', 'rgb(185,11,4)', 'rgb(227,51,25)', 'rgb(233,109,64)', 'rgb(254,115,7)', 'rgb(254,189,138)', 'rgb(246,173,146)', 'rgb(253,157,138)', 'rgb(253,127,103)', 'rgb(254,148,67)', 'rgb(238,98,46)']);
            } else if (modeButton.id === "blueBtn") {
                blueBtn.classList.add("btn-on");
                usePen("blueMode", ['rgb(30,97,115)', 'rgb(46,114,148)', 'rgb(36,51,99)', 'rgb(48,0,84)', 'rgb(200,233,239)', 'rgb(52,143,182)', 'rgb(178,164,201)', 'rgb(99,28,153)', 'rgb(52,132,173)', 'rgb(139,192,212)', 'rgb(26,89,115)', 'rgb(9,66,97)', 'rgb(18,133,195)'])
            } else if (modeButton.id === "greenBtn") {
                greenBtn.classList.add("btn-on");
                usePen("greenMode", ['rgb(75,96,67)', 'rgb(101,131,84)', 'rgb(117,151,94)', 'rgb(149,187,114)', 'rgb(163,197,133)', 'rgb(179,207,153)', 'rgb(199,221,181)', 'rgb(221,234,209)', 'rgb(39,98,33)', 'rgb(59,129,50)', 'rgb(70,146,60)', 'rgb(82,164,71)', 'rgb(91,180,80)']);
            } else if (modeButton.id === "darkenBtn") {
                darkBtn.classList.add("btn-on");
                usePen("darkMode", "rgb(254,254,254)");
            } else if (modeButton.id === "lightenBtn") {
                lightBtn.classList.add("btn-on");
                usePen("lightMode", "rgb(254,254,254)");
            } else if (modeButton.id === "eraseBtn") {
                eraseBtn.classList.add("btn-on"); 
                usePen("eraseMode", "rgb(254,254,254)");
            } else if (modeButton.id === "solidBtn") {
                solidBtn.classList.add("btn-on");
                colors = penColorPicker.value;
                usePen("solidMode", colors);
            }
        })
    })
}


// EVENT LISTENERS:

rangeSlider.addEventListener("change", () => changeGridSize(rangeSlider.value));
clearBtn.addEventListener("click", clearGrid);
bgColorPicker.addEventListener("input", (e) => grid.style.backgroundColor = e.target.value);
penColorPicker.addEventListener("change", () => {
    solidBtn.classList.add("btn-on");
    colors = penColorPicker.value;
    usePen("solidMode", colors);
})


//ON LOAD DEFAULT:

createGrid();
chooseColorMode();
usePen("solidMode", penColorPicker.value);