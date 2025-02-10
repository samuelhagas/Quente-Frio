let correctIndex = 0;
let currentSize = 4;

function showDifficulty() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("difficulty").style.display = "block";
}

function backToMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("game").style.display = "none";
}

function startGame(size) {
    currentSize = size;
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("game").style.display = "block";

    const grid = document.querySelector(".grid-container");
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    grid.style.gridTemplateRows = `repeat(${size}, 60px)`;

    correctIndex = Math.floor(Math.random() * (size * size));

    for (let i = 0; i < size * size; i++) {
        const block = document.createElement("div");
        block.classList.add("grid-item");
        block.dataset.index = i;

        block.addEventListener("click", function() {
            checkProximity(i, block, size);
        });

        grid.appendChild(block);
    }
}

function checkProximity(index, block, size) {
    const correctRow = Math.floor(correctIndex / size);
    const correctCol = correctIndex % size;
    const clickedRow = Math.floor(index / size);
    const clickedCol = index % size;

    const distance = Math.abs(correctRow - clickedRow) + Math.abs(correctCol - clickedCol);
    const maxDistance = (size - 1) * 2;
    
    const relativeDistance = distance / maxDistance;
    const red = Math.round(255 * (1 - relativeDistance));
    block.style.backgroundColor = `rgb(${red}, 0, ${255 - red})`;

    if (index === correctIndex) {
        setTimeout(() => alert("Parabéns! Você encontrou o bloco correto!"), 100);
    }
}
