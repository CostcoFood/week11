$(document).ready(function() {
    // Constants for player classes and winning combinations
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2],  // Top row
        [3, 4, 5],  // Middle row
        [6, 7, 8],  // Bottom row
        [0, 3, 6],  // Left column
        [1, 4, 7],  // Middle column
        [2, 5, 8],  // Right column
        [0, 4, 8],  // Diagonal from top-left to bottom-right
        [2, 4, 6]   // Diagonal from top-right to bottom-left
    ];

    let oTurn; // Boolean for turns, false for x true for o
    const cellElements = $('[data-cell]'); // jQuery object of all cells
    const turnIndicator = $('#turnIndicator');
    const restartButton = $('#restartButton'); 

    // Function to initialize the game
    function startGame() {
        oTurn = false; // Start with x turn
        cellElements.each(function() {
            $(this).removeClass(X_CLASS); // Removes x from cell
            $(this).removeClass(O_CLASS); // Removes o from cell
            $(this).text(''); // Clear texts of a cell
            $(this).off('click'); // Remove any existing click handlers
            $(this).on('click', handleClick); // Add new click handler
        });
        turnIndicator.text("X's Turn"); // Updates turn text
        $('.alert').remove(); // Removes existing alerts
    }

    // Event handler for clicking a cell
    function handleClick() {
        const cell = $(this); // jQuery object of the clicked cell
        const currentClass = oTurn ? O_CLASS : X_CLASS; 
        placeMark(cell, currentClass); // Place mark (X or O) in the clicked cell
        if (checkWin(currentClass)) {
            endGame(false); // Checks if the current player wins
        } else if (isDraw()) {
            endGame(true); // Checks if the game is a draw
        } else {
            swapTurns(); // Switches turns
        }
    }

    // Function to place a mark in the clicked cell
    function placeMark(cell, currentClass) {
        cell.addClass(currentClass);
        cell.text(currentClass.toUpperCase());
    }

    // Function to switch turns between X and O
    function swapTurns() {
        oTurn = !oTurn;
        turnIndicator.text(oTurn ? "O's Turn" : "X's Turn");
    }

    // Function to check if the current player has won
    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements.eq(index).hasClass(currentClass);
            });
        });
    }

    function isDraw() {
        return cellElements.toArray().every(cell => {
            return $(cell).hasClass(X_CLASS) || $(cell).hasClass(O_CLASS);
        });
    }

    // Function to end the game with a message
    function endGame(draw) {
        if (draw) {
            $('body').append('<div class="alert alert-info text-center" role="alert">Draw!</div>');
        } else {
            $('body').append(`<div class="alert alert-success text-center" role="alert">${oTurn ? "O's" : "X's"} Wins!</div>`);
        }
    }

    restartButton.on('click', startGame);

    startGame(); // Initialize the game when the page loads
});
