let correctIndex = 0; // Armazena a posição do bloco correto
let currentSize = 4; // Tamanho padrão da grade (4x4)

/* Exibe a tela de seleção de dificuldade */
function showDifficulty() {
    document.getElementById("menu").style.display = "none"; // Esconde o menu inicial
    document.getElementById("difficulty").style.display = "flex"; // Mostra a tela de dificuldade
}

/* Volta para o menu inicial */
function backToMenu() {
    document.getElementById("menu").style.display = "flex"; // Exibe o menu inicial
    document.getElementById("difficulty").style.display = "none"; // Esconde a tela de dificuldade
    document.getElementById("game").style.display = "none"; // Esconde a tela do jogo
}

/* Inicia o jogo com o tamanho da grade selecionado */
function startGame(size) {
    currentSize = size; // Define o tamanho da grade atual
    document.getElementById("difficulty").style.display = "none"; // Esconde a tela de dificuldade
    document.getElementById("game").style.display = "flex"; // Exibe a tela do jogo

    const grid = document.querySelector(".grid-container");
    grid.innerHTML = ""; // Limpa os blocos anteriores
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // Define o número de colunas
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // Define o número de linhas

    correctIndex = Math.floor(Math.random() * (size * size)); // Sorteia um bloco correto aleatoriamente

    // Cria os blocos do jogo
    for (let i = 0; i < size * size; i++) {
        const block = document.createElement("div"); // Cria um elemento de bloco
        block.classList.add("grid-item"); // Adiciona a classe CSS ao bloco
        block.dataset.index = i; // Armazena o índice do bloco

        // Adiciona um evento de clique no bloco
        block.addEventListener("click", function() {
            checkProximity(i, block, size); // Verifica proximidade ao clicar
        });

        grid.appendChild(block); // Adiciona o bloco à grade
    }
}

/* Verifica a proximidade do clique em relação ao bloco correto */
function checkProximity(index, block, size) {
    const correctRow = Math.floor(correctIndex / size); // Linha do bloco correto
    const correctCol = correctIndex % size; // Coluna do bloco correto
    const clickedRow = Math.floor(index / size); // Linha do bloco clicado
    const clickedCol = index % size; // Coluna do bloco clicado

    // Calcula a distância de Manhattan entre o bloco correto e o clicado
    const distance = Math.abs(correctRow - clickedRow) + Math.abs(correctCol - clickedCol);
    const maxDistance = (size - 1) * 2; // Distância máxima possível na grade
    const relativeDistance = distance / maxDistance; // Normaliza a distância (0 a 1)

    // Define a cor do bloco com base na proximidade
    const red = Math.round(255 * (1 - relativeDistance)); // Quanto mais perto, mais vermelho
    block.style.backgroundColor = `rgb(${red}, 0, ${255 - red})`; // Azul (frio) → Vermelho (quente)

    // Se o jogador acertar o bloco correto
    if (index === correctIndex) {
        setTimeout(() => alert("Parabéns! Você encontrou o bloco correto!"), 100); // Exibe mensagem de vitória
    }
}
