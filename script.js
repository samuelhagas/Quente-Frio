let correctIndex = 0;
let currentSize = 4; // Tamanho inicial (4x4)

function showDifficulty() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("difficulty").style.display = "flex";
}

function backToMenu() {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("game").style.display = "none";
}

function startGame(size) {
    currentSize = size;
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("game").style.display = "flex";

    const grid = document.querySelector(".grid-container");
    grid.innerHTML = "";
    
    // Calcula o tamanho dos blocos com base no tamanho da tela
    const gridSize = Math.min(window.innerWidth, window.innerHeight) * 0.8; // 80% da menor dimensão
    const blockSize = gridSize / size;

    grid.style.gridTemplateColumns = `repeat(${size}, ${blockSize}px)`;
    grid.style.gridTemplateRows = `repeat(${size}, ${blockSize}px)`;

    // Escolhe um bloco aleatório como o correto (0 a size*size - 1)
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

    // Calcula a distância de Manhattan
    const distance = Math.abs(correctRow - clickedRow) + Math.abs(correctCol - clickedCol);
    const maxDistance = (size - 1) * 2; // Maior distância possível

    // Calcula a cor baseada na distância
    const relativeDistance = distance / maxDistance;
    const red = Math.round(255 * (1 - relativeDistance));
    block.style.backgroundColor = `rgb(${red}, 0, ${255 - red})`;

    if (index === correctIndex) {
        setTimeout(() => alert("Parabéns! Você encontrou o bloco correto!"), 100);
    }
}

// Adiciona um listener para redimensionar o grid quando a janela for redimensionada
window.addEventListener("resize", () => {
    if (document.getElementById("game").style.display === "flex") {
        startGame(currentSize);
    }
});
