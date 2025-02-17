let correctIndex = 0; // Índice do bloco correto
let currentSize = 4; // Tamanho inicial da grade (4x4)

// Exibe a tela de seleção de dificuldade
function showDifficulty() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("difficulty").style.display = "block";
}

// Retorna ao menu principal
function backToMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("game").style.display = "none";
}

// Inicia o jogo com o tamanho da grade selecionado
function startGame(size) {
    currentSize = size;
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("game").style.display = "block";

    const grid = document.querySelector(".grid-container");
    grid.innerHTML = ""; // Limpa a grade anterior
    grid.style.gridTemplateColumns = `repeat(${size}, 60px)`; // Define colunas
    grid.style.gridTemplateRows = `repeat(${size}, 60px)`; // Define linhas

    // Escolhe um bloco aleatório como o correto
    correctIndex = Math.floor(Math.random() * (size * size));

    for (let i = 0; i < size * size; i++) {
        const block = document.createElement("div");
        block.classList.add("grid-item");
        block.dataset.index = i; // Define o índice do bloco

        // Adiciona evento de clique para verificar proximidade
        block.addEventListener("click", function() {
            checkProximity(i, block, size);
        });

        grid.appendChild(block); // Adiciona bloco à grade
    }
}

// Verifica a proximidade do clique em relação ao bloco correto
function checkProximity(index, block, size) {
    const correctRow = Math.floor(correctIndex / size); // Linha do bloco correto
    const correctCol = correctIndex % size; // Coluna do bloco correto
    const clickedRow = Math.floor(index / size); // Linha do bloco clicado
    const clickedCol = index % size; // Coluna do bloco clicado

    // Calcula a distância de Manhattan
    const distance = Math.abs(correctRow - clickedRow) + Math.abs(correctCol - clickedCol);
    const maxDistance = (size - 1) * 2; // Maior distância possível

    // Define a cor baseada na distância (quente e frio)
    const relativeDistance = distance / maxDistance;
    const red = Math.round(255 * (1 - relativeDistance)); // Intensidade de vermelho
    block.style.backgroundColor = `rgb(${red}, 0, ${255 - red})`; // Define cor entre vermelho e azul

    // Se for o bloco correto, exibe mensagem de vitória
    if (index === correctIndex) {
        setTimeout(() => alert("Parabéns! Você encontrou o bloco correto!"), 100);
    }
}
