'use strict';
let newGame = document.querySelector('.btn--new');
let roll = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let player1Input = document.querySelector('#input--0');
let player2Input = document.querySelector('#input--1');
let player1Name = document.querySelector('#name--0');
let player2Name = document.querySelector('#name--1');
let player1Box = document.querySelector('.player--0');
let player2Box = document.querySelector('.player--1');
let player1Score = document.querySelector('#score--0');
let player2Score = document.querySelector('#score--1');
let player1Current = document.querySelector('#current--0');
let player2Current = document.querySelector('#current--1');
let dice = document.querySelector('.dice');

let arr = [];
let gameOverPoints = 101;

player1Input.focus();
startNewGame();

// ? ////////////////////// EVENT LISTENERS ////////////////////////
newGame.addEventListener('click', startNewGame);
player1Input.addEventListener('keypress', checkPlayer1);
player2Input.addEventListener('keypress', checkPlayer2);

// ? ////////////////////// WHEN START THE GAME, RETURN EVERYTHING TO THE STARTING POSITION ////////////////////////
function startNewGame() {
  roll.addEventListener('click', rollDice);
  hold.addEventListener('click', holdCurrent);
  player1Box.classList.add('player--active');
  player2Box.classList.remove('player--active');
  player1Box.classList.remove('player--winner');
  player2Box.classList.remove('player--winner');
  dice.style.display = 'none';
  player1Score.innerHTML = 0;
  player2Score.innerHTML = 0;
  player1Current.innerHTML = 0;
  player2Current.innerHTML = 0;
  arr.length = 0;
}

// ? ////////////////////// ROLLING THE DICE ////////////////////////
function rollDice() {
  dice.style.display = 'block';
  let randomDice = Math.ceil(Math.random() * 6);
  dice.src = 'images/dice-' + randomDice + '.png';

  // ? /////////////// HANDLING WHOSE TURN TO PLAY ////////////////
  arr.length === 0 ? player1Current.innerHTML = parseInt(player1Current.innerHTML) + randomDice : player2Current.innerHTML = parseInt(player2Current.innerHTML) + randomDice;

  // ? ///////////////// WHEN A PLAYER ROLLS A 1, HE LOSE CURRENT SCORE AND THE ANOTHER PLAYER PLAYS /////////////////
  if (randomDice === 1) {
    arr.push(1);

    player1Box.classList.toggle('player--active');
    player2Box.classList.toggle('player--active');

    if (arr.length === 2) {
      arr.length = 0;
      player2Current.innerHTML = 0;
    } else {
      player1Current.innerHTML = 0;
    }
  }
  checkWinner();
}

// ? ////// IF THE PLAYER DECIDES TO HOLD THE POINTS EARNED FROM THE CURRENT SCORE BEFORE RECEIVING 1 AND THE ANOTHER PLAYER PLAYS //////////
function holdCurrent() {
  arr.push(1);

  player1Box.classList.toggle('player--active');
  player2Box.classList.toggle('player--active');

  if (arr.length === 2) {
    arr.length = 0;
    player2Score.innerHTML =
      parseInt(player2Score.innerHTML) + parseInt(player2Current.innerHTML);
    player2Current.innerHTML = 0;
  } else {
    player1Score.innerHTML =
      parseInt(player1Score.innerHTML) + parseInt(player1Current.innerHTML);
    player1Current.innerHTML = 0;
  }
  checkWinner();
}

// ? /////////////// CHECKING IF WE HAVE A WINNER ////////////////
function checkWinner() {
  if (player1Score.innerHTML >= gameOverPoints) {
    roll.removeEventListener('click', rollDice);
    hold.removeEventListener('click', holdCurrent);
    player1Box.classList.add('player--winner');
  } else if (player2Score.innerHTML >= gameOverPoints) {
    roll.removeEventListener('click', rollDice);
    hold.removeEventListener('click', holdCurrent);
    player2Box.classList.add('player--winner');
  }
}

// ? /////////////// NAMEING THE PLAYERS ///////////
function checkPlayer1(e) {
  if (e.key === 'Enter') {
    if (player1Input.value) {
      player1Name.innerHTML = player1Input.value;
      player2Input.focus();
    } else {
      player1Name.innerHTML = 'Player 1';
    }
  }
}

function checkPlayer2(e) {
  if (e.key === 'Enter') {
    (player2Input.value) ? player2Name.innerHTML = player2Input.value : player2Name.innerHTML = 'Player 2';
  }
}
