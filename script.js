const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let cells = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let inGame = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function start() {
    board.innerHTML = "";

    cells.forEach((_, index) => {
        const celula = document.createElement("div");
        celula.classList.add("celula");
        celula.dataset.index = index;

        celula.addEventListener("click", () => click(index));

        board.appendChild(celula);
    });

    statusText.innerHTML = `Vez do jogador ${player}`;
}

function click(index) {
    if (!inGame || cells[index] !== "") return;

    cells[index] = player;

    render();

    if (checkWin()) {
        statusText.innerHTML = `Jogador ${player} venceu!`;
        inGame = false;
        return;
    }

    if (!cells.includes("")) {
        statusText.innerHTML = "Empate!";
        inGame = false;
        return;
    }

    player = player === "X" ? "O" : "X";
    statusText.innerHTML = `Vez do jogador ${player}`;
}

function render() {
    const celulas = document.querySelectorAll(".celula");

    celulas.forEach((celula, index) => {
        celula.innerHTML = cells[index];
    });
}

function checkWin() {
    return winningConditions.some(([a, b, c]) => {
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

resetBtn.addEventListener("click", () => {
    cells = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    inGame = true;
    start();
});

start();
