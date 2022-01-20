// XXX Rip this out
const print = console.log;
//

let isFirstPlayer = true;
let board = Array(8);

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
    for (const e of winningCombos) {
      // iterate over winning combo to see if someone has won
      x = [board[e[0]],
           board[e[1]],
           board[e[2]]];
      if (x.every(Number.isInteger) &&
          x.every((v, i , a) => v === a[0])) {
        return x[0];
      }
    }
  }

  function markPosition(sel, player) {
    if (Number.isInteger(board[sel.id])) {
      return;
    }

    $(sel).html(`<h2>${player}</h2>`)

    if (player === 'X') {
      board[sel.id] = 0;
    } else {
      board[sel.id] = 1;
    }
  }

  $('div.row div').on('click', function(e) {
    markPosition(this, isFirstPlayer ? 'X' : 'O');
    checkWinner(board);
    // display winner
    // display winning move (return win combo from check winner)
    // lock out user from any more clicks
    // show reset button to redo
    isFirstPlayer = !isFirstPlayer;
  })

  $('#debug').on('click', e => {
    print(isFirstPlayer);
    print(board);
  })
})
