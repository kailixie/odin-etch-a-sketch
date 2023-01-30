//INITIAL: 
const sidebar = document.querySelector(".sidebar")
const grid = document.querySelector(".grid");
const bgColorPicker = document.querySelector("#backgroundColorPicker")
const solidBtn = document.getElementById("solidBtn");
const redBtn = document.getElementById("redBtn");
const blueBtn = document.getElementById("blueBtn");
const greenBtn = document.getElementById("greenBtn");
const darkBtn = document.getElementById("darkenBtn");
const lightBtn = document.getElementById("lightenBtn");
const clearBtn = document.getElementById("clearBtn");
const eraseBtn = document.getElementById("eraseBtn");

var gridCells = grid.querySelectorAll("div");

let cells = [];


// CONTROLS: 

// Range Bar & Text for Grid Size:
const rangeSlider = document.querySelector("#rangeSlider");
rangeSlider.value = 50;

const sliderText = document.querySelector("#slideText");
sliderText.textContent = `Grid Size: ${rangeSlider.value} x ${rangeSlider.value}`;
rangeSlider.addEventListener("mousemove", function () {
    sliderText.textContent = `Grid Size: ${rangeSlider.value} x ${rangeSlider.value}`;
})

// Pen Color:

// // let defaultPenColor = "rgba(0, 0, 0, 0.5)";
// let defaultBgColor = "rgba(255, 255, 255, 1)";

// let penColorPicker = document.querySelector("#penColorPicker")
// penColorPicker.addEventListener("input", (e) => {
//     newPenColor = e.target.value;
// })

// Background Color: 



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

// function colorGrid() {
//     cells.target.style.backgroundColor = penColorPicker.value;
// }

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
                if (!e.target.dataset.shade) {
                    e.target.setAttribute("data-shade", "1");
                } else {
                    let shadeLevel = parseInt(e.target.getAttribute("data-shade"));
                    shadeLevel++;
                    e.target.setAttribute("data-shade", `${shadeLevel}`);
                }
                if (e.target.style.backgroundColor == "" || e.target.backgroundColor == "transparent") {
                    e.target.style.backgroundColor = bgColorPicker.value;
                }
                e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, -15);
            });
        } else if (colorMode === "lightMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                if (!e.target.dataset.shade) {
                    e.target.setAttribute("data-shade", "-1");
                } else {
                    let shadeLevel = parseInt(e.target.getAttribute("data-shade"));
                    shadeLevel--;
                    e.target.setAttribute("data-shade", `${shadeLevel}`);
                }
                if (e.target.style.backgroundColor == "" || e.target.backgroundColor == "transparent") {
                    e.target.style.backgroundColor = bgColorPicker.value;
                }
                e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, +15);
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
                usePen("redMode", ['#680108', '#95020B', '#9C1D18', '#B90B04', '#E33319', '#E96D40', '#fe7307', '#febd8a', '#f6ad92', '#fd9d8a', '#fd7f67', '#fe9443', '#ee622e']);
            } else if (modeButton.id === "blueBtn") {
                blueBtn.classList.add("btn-on");
                usePen("blueMode", ['#1e6173', '#2e7294', '#243363', '#300054', '#c8e9ef', '#348fb6', '#b2a4c9', '#631c99', '#3484ad', '#8bc0d4', '#1a5973', '#094261', '#1285c3'])
            } else if (modeButton.id === "greenBtn") {
                greenBtn.classList.add("btn-on");
                usePen("greenMode", ['#4b6043', '#658354', '#75975e', '#95bb72', '#a3c585', '#b3cf99', '#c7ddb5', '#ddead1', '#276221', '#3b8132', '#46923c', '#52a447', '#5bb450']);
            } else if (modeButton.id === "darkenBtn") {
                darkBtn.classList.add("btn-on");
                usePen("darkMode", "#fefefe");
            } else if (modeButton.id === "lightenBtn") {
                lightBtn.classList.add("btn-on");
                usePen("lightMode", "#fefefe");
            } else if (modeButton.id === "eraseBtn") {
                eraseBtn.classList.add("btn-on"); 
                usePen("eraseMode", "#fefefe");
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


//ON LOAD DEFAULT:
createGrid();
chooseColorMode();