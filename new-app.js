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
let bgColor = '#ffffff';
grid.style.backgroundColor = bgColor;

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
        cells[i].dataset.darken = 0;
        cells[i].dataset.lighten = 0;
        grid.appendChild(cells[i]);
    }
}

// PEN COLOR:

// function usePen(colorMode, colors) {
//     let gridCells = grid.querySelectorAll("div");
//     gridCells.forEach((gridCell) => {
//         if (colorMode === "redMode" || colorMode === "blueMode" || colorMode === "greenMode"){
//             const randomColor = colors[Math.floor(Math.random() * colors.length,)];
//             gridCell.addEventListener("mouseenter", (e) => {
//                 e.target.style.backgroundColor = randomColor;
//                 e.target.setAttribute("data-inked", "true");
//                 e.target.removeAttribute("data-shade");
//             });
//         } else if (colorMode === "solidMode") {
//             gridCell.addEventListener("mouseenter", (e) => {
//                 e.target.style.backgroundColor = colors;
//                 e.target.setAttribute("data-inked", "true");
//                 e.target.removeAttribute("data-shade");
//             });
//         } else if (colorMode === "eraseMode") {
//             gridCell.addEventListener("mouseenter", (e) => {
//                 e.target.style.backgroundColor = "";
//                 e.target.removeAttribute("data-inked");
//                 e.target.removeAttribute("data-shade");
//             });
//         } else if (colorMode === "darkMode") {
//             gridCell.addEventListener("mouseenter", darken(e));
//             // gridCell.addEventListener("mouseenter", (e) => {
//             //     let currentColor = darken(e);
//             //     e.target.style = `background-color: rgba(${currentColor})`;
//             // });
//         } else if (colorMode === "lightMode") {
//             gridCell.addEventListener("mouseenter", lighten(e));
//             // gridCell.addEventListener("mouseenter", (e) => {
//             //     e.target.style.backgroundColor = lighten(e);
//             // });
//         }
//     })
// }


function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    // Turn "rgb(r,g,b)" into [r,g,b]
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


// function darken(e) {
//     let oldColor = e.target.style.backgroundColor;
//     console.log(oldColor);
//     let rgbaString = (oldColor.charAt(3) == 'a') ? oldColor.slice(5, -1) : oldColor.slice(4, -1);
//     //checks whether backgroundColor is in rgba or rgb format
//     let rgbaArray = rgbaString.split(',');
//     let red = rgbaArray[0];
//     let green = rgbaArray[1];
//     let blue = rgbaArray[2];
//     let alpha = rgbaArray[3] ? rgbaArray[3] : 1;
//     let currentDarkeningStep = e.target.dataset.darken;
//     if(currentDarkeningStep == 9) return [0, 0, 0, 1]; //cell is already black
//     console.log([red, green, blue, alpha]);
//     console.log('Current darkening step: ' + currentDarkeningStep);
//     let newRed = getNewColorValue(red, currentDarkeningStep, false);
//     let newGreen = getNewColorValue(green, currentDarkeningStep, false);
//     let newBlue = getNewColorValue(blue, currentDarkeningStep, false);
//     let newAlpha = getNewColorValue(alpha, currentDarkeningStep, true);
//     currentDarkeningStep++;
//     e.target.dataset.darken = currentDarkeningStep;
//     console.log([newRed, newGreen, newBlue, newAlpha]);
//     return [newRed, newGreen, newBlue, newAlpha];
//   }

// function getNewColorValue(currentColorValue, step, alpha) {
//     let increment;
//     let newValue;
//     if(!alpha) {
//       increment = currentColorValue / (10 - step);
//       console.log('Current color value: ' + currentColorValue);
//       console.log('Increment: ' + increment);
//       newValue = currentColorValue - increment;
//     }else {
//       increment = (1 - currentColorValue) / (10 - step);
//       console.log('Current color value: ' + currentColorValue);
//       console.log('Increment: ' + increment);
//       newValue = +currentColorValue + increment; 
//     }
//     console.log('New color value: ' + newValue);
//     return (newValue);
//   }

function usePen(colorMode, colors) {
    const randomColor = colors[Math.floor(Math.random() * colors.length,)]
    const gridCells = grid.querySelectorAll("div");
    gridCells.forEach((gridCell) => {
        gridCell.addEventListener("mouseenter", (e) => {
            if (colorMode === "redMode" || colorMode === "blueMode" || colorMode === "greenMode") {
                e.target.style.backgroundColor = randomColor;
                e.target.setAttribute("data-inked", "true");
                e.target.removeAttribute("data-shade");
            } else if (colorMode === "solidMode") {
                e.target.style.backgroundColor = colors;
                e.target.setAttribute("data-inked", "true");
                e.target.removeAttribute("data-shade");
            } else if (colorMode === "eraseMode") {
                    e.target.style.backgroundColor = "";
                    e.target.removeAttribute("data-inked");
                    e.target.removeAttribute("data-shade");
            } else if (colorMode === "darkMode") {
                if (!e.target.dataset.shade) {
                    e.target.setAttribute('data-shade', '1');
                } else {
                    let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
                    shadeAmount++;
                    e.target.setAttribute('data-shade', `${shadeAmount}`);
                }
                if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transparent') {
                    e.target.style.backgroundColor = bgColor;
                }
                e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, -15);
            } else if (colorMode === "lightMode") {
                if (!e.target.dataset.shade) {
                    e.target.setAttribute('data-shade', '-1');
                } else {
                    let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
                    shadeAmount--;
                    e.target.setAttribute('data-shade', `${shadeAmount}`);
                }
                if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transparent') {
                    e.target.style.backgroundColor = bgColor;
                }
                e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, +15);
            }
        })
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
    let gridCells = grid.querySelectorAll("div");
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
                // gridCells.forEach(gridCell => gridCell.dataset.darken = 0);
                usePen("darkMode", "rgb(0, 0, 0)");
            } else if (modeButton.id === "lightenBtn") {
                lightBtn.classList.add("btn-on");
                // gridCells.forEach(gridCell => gridCell.dataset.lighten = 0);
                usePen("lightMode", "rgb(255, 255, 255)");
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