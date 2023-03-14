let cells = document.querySelectorAll(".cell");
let statusText = document.querySelector("#statusText");
let restartBtn = document.querySelector("#restartBtn");

/* let player1Name = 'котик';
let player2Name = 'мышка'; */

let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked, {once:true}));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Ходит ${currentPlayer}`;
    running = true;
}
function cellClicked() {
    let cellIndex = this.getAttribute('cellIndex');
    
    if(options[cellIndex] != '' || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function restartGame() {
    console.log("restart");
    currentPlayer = 'x';
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Ходит ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.addEventListener('click', cellClicked, {once:true}));
    running = true;
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Победитель ${currentPlayer}!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Ничья!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function changePlayer() {
    currentPlayer = currentPlayer === 'x' ? '0' : 'x';
    statusText.textContent = `Ходит ${currentPlayer}`;
}