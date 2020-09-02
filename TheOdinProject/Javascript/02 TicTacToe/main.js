const game = (() => {
    let gameBoard = ["_","_","_",
                     "_","_","_",
                     "_","_","_"];

    const winConditions = [[0,1,2],[3,4,5],[6,7,8],
                           [0,3,6],[1,4,7],[2,5,8],
                           [0,4,8],[2,4,6]];

    const getGameBoard = () => gameBoard.slice();
    
    
    const updateBoard = (position, player) => {
        gameBoard[position] = player;

        const boardContainer = document.querySelector('.board-container');

        if(player === 'x') {
            boardContainer.childNodes[position].innerHTML = '<ion-icon name="close"></ion-icon>';
        } else {
            boardContainer.childNodes[position].innerHTML = '<ion-icon name="radio-button-off"></ion-icon>';
        }

        boardContainer.childNodes[position].classList += ' active';
    
    }

    const resetBoard = () => {
        for(let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = '_';
        }
        console.log(gameBoard);
    };

    const renderBoard = () => {
        const boardContainer = document.createElement('div');
        boardContainer.setAttribute('class', 'board-container');

        for (item of gameBoard) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            
            if(item === 'x') {
                cell.innerHTML = '<ion-icon name="close"></ion-icon>';
                cell.classList += ' active';
            } else if(item === 'o') {
                cell.innerHTML = '<ion-icon name="radio-button-off"></ion-icon>';
                cell.classList += ' active';
            }

            boardContainer.appendChild(cell.cloneNode(true));
        }

        document.body.appendChild(boardContainer);
    }
    
    const startGame = (player1, player2) => {
        game.renderBoard();
        console.log('Rendered Board!');
        let currentPlayer = player1.getRole();
        const boardContainer = document.querySelector('.board-container');
        let count = 0;
            boardContainer.addEventListener('click', function(e) {
                if(e.target.classList[0] === 'cell' && e.target.classList[1] === undefined) {    
                    const position = Array.from(e.target.parentNode.children).indexOf(e.target);
                    game.updateBoard(position, currentPlayer);
                    if(currentPlayer === 'x') {
                        currentPlayer = player2.getRole();
                    } else {
                        currentPlayer = player1.getRole();
                    }
                    count++;
                    checkWinCondition(count, player1, player2);
                }
            });

           
           
    }


    const checkWinCondition = (count, player1, player2) => {
        let board = game.getGameBoard();
        let won = false;

        for(condition of game.winConditions) {
            if(board[condition[0]] === 'x' && board[condition[1]] === 'x' && board[condition[2]] === 'x'){
                won = 'Player 1';
            }
            if(board[condition[0]] === 'o' && board[condition[1]] === 'o' && board[condition[2]] === 'o'){
                won = 'Player 2';
            }
        }

        const modal = document.querySelector('.modal-container');

        if(count === 9 || won !== false) { // If game is over
            if(won !== false) {
                console.log(won);
                modal.childNodes[1].innerHTML = `${won} Won!`;
            } else {
                modal.childNodes[1].innerHTML = `TIED!`
            }

            modal.style.display = 'flex';

            const restart = document.querySelector('.restart');
            const exit = document.querySelector('.exit');
            const boardContainer = document.querySelector('.board-container');


            restart.addEventListener('click', () => {
                game.resetBoard();
                modal.style.display = 'none';
                boardContainer.remove();
                game.startGame(player1, player2);   
            });
    
            exit.addEventListener('click', () => {
                game.resetBoard();
                modal.style.display = 'none';
                boardContainer.remove();
                const mainMenu = document.querySelector('.init-container');
                mainMenu.style.display = 'flex';
    
            });

        }

       

        
    }


    return {getGameBoard, updateBoard, renderBoard,
            winConditions, startGame, resetBoard, checkWinCondition}

})();


const CreatePlayer = (role, name) => {
    const getRole = () => role;

    return {getRole, name}
}


const displayController = (() => {

    const twoPlayerScreen = document.querySelector('.two-player-selection');
    const twoPlayerBtn = document.querySelector('.two-players');
    
    twoPlayerBtn.addEventListener('click', () => {
        const mainMenu = document.querySelector('.init-container');
        mainMenu.style.display = 'none';
        twoPlayerScreen.style.display = 'flex';

    });

    const startBtn = document.querySelector('.start');
    startBtn.addEventListener('click', () => {
        let player1 = document.querySelector('input[name="player1"').value,
            player2 = document.querySelector('input[name="player2"').value;

        if(player1 === '') {
            player1 = CreatePlayer('x', 'Player 1');
        } else {
            player1 = CreatePlayer('x', player1);
        }

        if(player2 === '') {
            player2 = CreatePlayer('o', 'Player 2');
        } else {
            player2 = CreatePlayer('o', player2);
        }

        twoPlayerScreen.style.display = 'none';
        game.startGame(player1, player2);


    });



    const vsBotBtn = document.querySelector('.vs-bot');
    vsBotBtn.addEventListener('click', () => {
        const mainMenu = document.querySelector('.init-container');
        mainMenu.remove();
        game.renderBoard();
    })

})();
