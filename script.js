'use strict';
//Selecting Elements ("El" is for Element)
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const totalScore0El = document.querySelector('#score--0');
//querySelector vs. getElementById (this one is better with Id's)
const totalScore1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
totalScore0El.textContent = 0;
totalScore1El.textContent = 0;
diceEl.classList.add('hidden');

//declaring our variables
let scores, currentScore, activePlayer, playing;

//funtion for resetting the game
const init = function() {
    totalScore0El.textContent = 0;
    totalScore1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0; //Player-1
    playing = true;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner', 'name');
    player1El.classList.remove('player--winner', 'name');
    document.getElementById(`name--0`).textContent = 'PLAYER 1';
    document.getElementById(`name--1`).textContent = 'PLAYER 2';
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

}

init();

//function for switching the player
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality-Roll button click
btnRoll.addEventListener('click',
    function() {
        if (playing) {
            // 1.Generating a random dice roll
            const dice = Math.trunc(Math.random() * 6) + 1;
            // 2. Display the dice
            diceEl.classList.remove('hidden');
            diceEl.src = `./images/dice-${dice}.png`;
            // 3. Check for rolled 1: if true, 
            if (dice !== 1) {
                // Add dice to the current score
                currentScore += dice;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            } else {
                //switch to next player
                switchPlayer();
            }
        }
    });

//Holding the score functionality-Hold button click
btnHold.addEventListener('click', function() {
    if (playing) {
        // 1.Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2.Check if player's score >= 100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner', 'name');
            document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
