const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game');
let currentPlayer = 'X';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
            resetBoard();
        } else if (isDraw()) {
            setTimeout(() => alert(`It's a draw!`), 100);
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
