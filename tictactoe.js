// XXX Rip this out
const print = console.log;
//

let currentPlayer = true;
let board = Array(9);
let winningPlay = Array(3);

// 012
// 345
// 678

const winningCombos = [[0, 1, 2],
                       [3, 4, 5],
                       [6, 7, 8],
                       [0, 3, 6],
                       [1, 4, 7],
                       [2, 5, 8],
                       [0, 4, 8],
                       [2, 4, 6]];


$(document).ready(function () {
  function checkWinner(board) {
    // iterate over winning combo to see if someone has won
    for (const e of winningCombos) {
      x = [board[e[0]], board[e[1]], board[e[2]]];

      if (x.every(Number.isInteger) &&
          x.every((v, i , a) => v === a[0])) {
        winningPlay = [...e]
        return true;
      }
    }
    return false;
  }

  function markPosition(sel, player) {
    if (Number.isInteger(board[sel.id])) {
      return;
    }

    $(sel).text(player)

    if (player === 'X') {
      board[sel.id] = 0;
    } else {
      board[sel.id] = 1;
    }
  }

  function displayWinner() {
    winner = currentPlayer ? 'X' : 'O';
    $('#bottom-display').text(winner + ' won!');
    winningPlay.forEach(e => {
      $('#' + e).addClass('display')
    })
  }

  function updateCurrentMove() {
    $('#bottom-display').text('Current Move: ' + (currentPlayer ? 'X' : 'O'));
  }

  function registerBoardClicks() {
    updateCurrentMove();
    $('div.space').on('click', function(e) {
      markPosition(this, currentPlayer ? 'X' : 'O');
      if (checkWinner(board) && winningPlay.some(Number)) {
        $('div.space').off();
        displayWinner();
      } else if (board.every(Number.isInteger)) {
        $(this).off();
      }
      currentPlayer = !currentPlayer;
      updateCurrentMove();
    });
  }

  $('#clear').on('click', e => {
    board = Array(9);
    currentPlayer = true;

    $('div.space').each(function(i) {
      $(this).text('');
      $(this).removeClass('display');
    })
    $('#bottom-display').text('');

    registerBoardClicks();
  })

  $('#debug').on('click', e => {
    print(currentPlayer);
    print(board);
    print(winningPlay);
    print(winningPlay.some(Number));
    print('==============')
  })

  registerBoardClicks();
})
