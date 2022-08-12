'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnRollDiceEl = document.querySelector('.btn--roll');
const btnNewGameEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');

let scores, currScore, currPlayer, isPlaying;

const newGame = function () {
  scores = [0, 0];
  currScore = 0;
  currPlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;

  diceEl.classList.add('hidden');

  // if the class already there it will not add another one
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const togglePlayers = function () {
  document.getElementById(`current--${currPlayer}`).textContent = 0;
  currPlayer = Math.abs(currPlayer - 1);
  currScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const rollTheDice = function () {
  if (isPlaying) {
    const rollResult = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${rollResult}.png`;
    diceEl.classList.remove('hidden');
    if (rollResult !== 1) {
      currScore += rollResult;
      document.getElementById(`current--${currPlayer}`).textContent = currScore;
    } else {
      togglePlayers();
    }
  }
};
const holdScore = function () {
  if (isPlaying) {
    scores[currPlayer] += currScore;
    document.getElementById(`score--${currPlayer}`).textContent =
      scores[currPlayer];
    if (scores[currPlayer] >= 100) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currPlayer}`)
        .classList.remove('player--active');
      isPlaying = false;
    } else togglePlayers();
  }
};
newGame();
btnHoldEl.addEventListener('click', holdScore);
btnRollDiceEl.addEventListener('click', rollTheDice);
btnNewGameEl.addEventListener('click', newGame);
