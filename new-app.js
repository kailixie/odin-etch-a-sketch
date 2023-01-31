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
        gridCell.style.backgroundColor = "transparent";
        gridCell.dataset.darken = 0;
        gridCell.dataset.lighten = 0;
    });
    penActive = false;
}

// Change Grid Size:
function changeGridSize() {
    let gridCells = grid.querySelectorAll("div");
    gridCells.forEach(gridCell => gridCell.remove());
    createGrid(rangeSlider.value);
}

// Create Grid: 
let cells = [];
function createGrid() {
    let cellNum = rangeSlider.value;
    for (let i = 0; i < (cellNum * cellNum); i++) {
        grid.style.gridTemplateColumns = `repeat(${cellNum}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${cellNum}, 1fr)`;
        cells[i] = document.createElement("div");
        cells[i].classList.add("cells");
        cells[i].dataset.darken = 0;
        cells[i].dataset.lighten = 0;
        grid.appendChild(cells[i]);
    }
}

// DRAW STYLE:
// Toggle Pen: 
let penActive = false;
grid.addEventListener("click", () => usePen())

function usePen() {
    if (!penActive) {
        cells.forEach(cell => {
            cell.addEventListener("mouseenter", colorModes);
        })
        penActive = true;
    } else {
        cells.forEach(cell => {
            cell.removeEventListener("mouseenter", colorModes);
        })
        penActive = false;
    }
}

// Color Modes & Buttons:
function removeCurrentMode(buttons) {
    buttons.forEach((button) => {
        button.classList.remove("btn-on");
    });
}

const modeButtons = document.querySelectorAll(".colorMode");

function chooseColorMode () {
    // const modeButtons = document.querySelectorAll(".colorMode");
    modeButtons.forEach((modeButton) => {
        modeButton.addEventListener("click", () => {
            removeCurrentMode(modeButtons);
            usePen();
            if (modeButton.id === "redBtn") {
                redBtn.classList.add("btn-on");
                colorMode = "redMode";
            } else if (modeButton.id === "blueBtn") {
                blueBtn.classList.add("btn-on");
                colorMode = "blueMode";
            } else if (modeButton.id === "greenBtn") {
                greenBtn.classList.add("btn-on");
                colorMode = "greenMode";
            } else if (modeButton.id === "darkenBtn") {
                darkBtn.classList.add("btn-on");
                colorMode = "darkMode";
            } else if (modeButton.id === "lightenBtn") {
                lightBtn.classList.add("btn-on");
                colorMode = "lightMode";
            } else if (modeButton.id === "eraseBtn") {
                eraseBtn.classList.add("btn-on");
                colorMode = "eraseMode";
            } else if (modeButton.id === "solidBtn") {
                solidBtn.classList.add("btn-on");
                colorMode = "solidMode";
            }
        })
    })
}

let colors = [];
function colorModes(e) {
    const randomColor = colors[Math.floor(Math.random() * colors.length,)]
    switch (colorMode) {
        case ("redMode"):
            colors = ['rgb(104,1,8)', 'rgb(149,2,11)', 'rgb(156,29,24)', 'rgb(185,11,4)', 'rgb(227,51,25)', 'rgb(233,109,64)', 'rgb(254,115,7)', 'rgb(254,189,138)', 'rgb(246,173,146)', 'rgb(253,157,138)', 'rgb(253,127,103)', 'rgb(254,148,67)', 'rgb(238,98,46)'];
            e.target.style.backgroundColor = randomColor;
            e.target.setAttribute("data-inked", "true");
            e.target.removeAttribute("data-shade");
            break;
        case ("blueMode"):
            colors = ['rgb(30,97,115)', 'rgb(46,114,148)', 'rgb(36,51,99)', 'rgb(48,0,84)', 'rgb(200,233,239)', 'rgb(52,143,182)', 'rgb(178,164,201)', 'rgb(99,28,153)', 'rgb(52,132,173)', 'rgb(139,192,212)', 'rgb(26,89,115)', 'rgb(9,66,97)', 'rgb(18,133,195)'];
            e.target.style.backgroundColor = randomColor;
            e.target.setAttribute("data-inked", "true");
            e.target.removeAttribute("data-shade");
            break;
        case ("greenMode"):
            colors = ['rgb(75,96,67)', 'rgb(101,131,84)', 'rgb(117,151,94)', 'rgb(149,187,114)', 'rgb(163,197,133)', 'rgb(179,207,153)', 'rgb(199,221,181)', 'rgb(221,234,209)', 'rgb(39,98,33)', 'rgb(59,129,50)', 'rgb(70,146,60)', 'rgb(82,164,71)', 'rgb(91,180,80)'];
            e.target.style.backgroundColor = randomColor;
            e.target.setAttribute("data-inked", "true");
            e.target.removeAttribute("data-shade");
            break;
        case ("solidMode"):
            e.target.style.backgroundColor = penColorPicker.value;
            e.target.setAttribute("data-inked", "true");
            e.target.removeAttribute("data-shade");
            break;
        case ("eraseMode"):
            e.target.style.backgroundColor = "";
            e.target.removeAttribute("data-inked");
            e.target.removeAttribute("data-shade");
            break;
        case ("darkMode"):
            if (!e.target.dataset.shade) {
                e.target.setAttribute('data-shade', '1');
            } else {
                let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
                shadeAmount++;
                e.target.setAttribute('data-shade', `${shadeAmount}`);
            }
            if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transparent') {
                e.target.style.backgroundColor = bgColorPicker.value;
            }
            e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, -15);
            break;
        case ("lightMode"):
            if (!e.target.dataset.shade) {
                e.target.setAttribute('data-shade', '-1');
            } else {
                let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
                shadeAmount--;
                e.target.setAttribute('data-shade', `${shadeAmount}`);
            }
            if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transparent') {
                e.target.style.backgroundColor = bgColorPicker.value;
            }
            e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, +15);
            break;
    }
}

// Hex/RGB function from Stack Overflow
function RGBToHex(rgb) {
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    rgb = rgb.substr(4).split(')')[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    b = (+rgb[2]).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return '#' + r + g + b;
}
  
function adjust(RGBToHex, rgb, amount) {
    let color = RGBToHex(rgb);
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, (color) =>
          ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        )
    );
}

// EVENT LISTENERS:

rangeSlider.addEventListener("change", () => changeGridSize(rangeSlider.value));
clearBtn.addEventListener("click", clearGrid);
bgColorPicker.addEventListener("input", (e) => grid.style.backgroundColor = e.target.value);
penColorPicker.addEventListener("change", () => {
    removeCurrentMode(modeButtons);
    solidBtn.classList.add("btn-on");
    colorMode = "solidMode";
});

//ON LOAD DEFAULT:

createGrid();
chooseColorMode();
let colorMode = "solidMode";
// colorMode("solidMode", penColorPicker.value);