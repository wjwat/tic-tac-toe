const _DEBUG = false;

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
    board[sel.id] = 1;
  } else {
    board[sel.id] = 0;
  }
}

$(document).ready(function () {
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
    // If a user clicks #reset multiple times it will register multiple click event
    // handlers which is why when you'd click on a separate space you'd get another
    // X instead of an O.
    $('div.space').off('click');
    $('div.space').on('click', function(e) {
      markPosition(this, currentPlayer ? 'X' : 'O');
      if (checkWinner(board) && winningPlay.some(Number)) { // a player has won!
        $('div.space').off();
        displayWinner();
        return;
      } else if (board.every(Number.isInteger)) { // Stalemate
        $(this).off();
      }
      currentPlayer = !currentPlayer;
      updateCurrentMove();
    });
  }

  $('#reset').on('click', e => {
    board = Array(9);
    winningPlay = Array(3);
    currentPlayer = true;

    $('div.space').each(function(i) {
      $(this).text('');
      $(this).removeClass('display');
    })
    $('#bottom-display').text('');

    registerBoardClicks();
  })

  if (_DEBUG) {
    $('#debug').show();
    $('#debug').on('click', e => {
      let now = new Date();
      let out = {currentPlayer, board, winningPlay}; //, winningPlay.some(Number)};
      console.log(now.toISOString());
      console.log(out);
    })
  }

  registerBoardClicks();
})
