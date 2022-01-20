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

  // display winner
  // display winning move (return win combo from check winner)
  // lock out user from any more clicks
  // show reset button to redo
  function displayWinner() {
    winner = currentPlayer ? 'X' : 'O';
    $('#winners-circle').text(winner + ' won!');
    winningPlay.forEach(e => {
      $('#' + e).addClass('winner')
    })
  }

  function registerBoardClicks() {
    $('div.space').on('click', function(e) {
      markPosition(this, currentPlayer ? 'X' : 'O');
      if (checkWinner(board) && winningPlay.some(Number)) {
        $('div.space').off();
        displayWinner();
      };
      currentPlayer = !currentPlayer;
    });
  }

  $('#clear').on('click', e => {
    board = Array(9);
    currentPlayer = true;
    $('div.space').each(function(i) {
      $(this).text('');
      $(this).removeClass('winner');
    })
    $('#winners-circle').text('');
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
