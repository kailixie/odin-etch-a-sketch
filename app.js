function usePen(colorMode, colors) {
    let gridCells = grid.querySelectorAll("div");
    gridCells.forEach((gridCell) => {
        if (colorMode === "redMode" || colorMode === "blueMode" || colorMode === "greenMode"){
            const randomColor = colors[Math.floor(Math.random() * colors.length,)];
            gridCell.addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = randomColor;
                e.target.setAttribute("data-inked", "true");
                e.target.removeAttribute("data-shade");
            });
        } else if (colorMode === "solidMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = colors;
                e.target.setAttribute("data-inked", "true");
                e.target.removeAttribute("data-shade");
            });
        } else if (colorMode === "eraseMode") {
            gridCell.addEventListener("mouseenter", (e) => {
                e.target.style.backgroundColor = "";
                e.target.removeAttribute("data-inked");
                e.target.removeAttribute("data-shade");
            });
        } else if (colorMode === "darkMode") {
            gridCell.addEventListener("mouseenter", darken(e));
            // gridCell.addEventListener("mouseenter", (e) => {
            //     let currentColor = darken(e);
            //     e.target.style = `background-color: rgba(${currentColor})`;
            // });
        } else if (colorMode === "lightMode") {
            gridCell.addEventListener("mouseenter", lighten(e));
            // gridCell.addEventListener("mouseenter", (e) => {
            //     e.target.style.backgroundColor = lighten(e);
            // });
        }
    })
}