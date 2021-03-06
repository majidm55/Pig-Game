/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, lastScore;

init();

//better to use anonymous function for a specific event//
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

            //1 . random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        //3. Update Round Score  IF you rolled consecutive 6s
         if(lastScore === 6 && dice === 6){
            alert('you scored 6 twice');
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            lastScore = 0;
            nextPlayer();

         // 4.   Update Round Score  IF the rolled number wasn't 1
        } else if (dice !== 1 && dice2 !==1) {
            // Add Score
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            console.log("dice1 oh comeon - dice 2", dice, dice2);

        } else if (dice === 1 || dice2 === 1) {
            console.log("dice1", dice, 'dice2', dice2);
            document.querySelector('#current-' + activePlayer).textContent = '0';
            nextPlayer();

        } else {
            nextPlayer();

        }

        lastScore = dice;
        
        
    }
});



// Setting an Input Field in the game
// document.getElementById('myScore').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter')  {
//       // code for enter
//       inputValue = document.getElementById("myScore").value }
// });

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.getElementById("myScore").value
        var winningScore;
        if(input) {
            winningScore = input;
        } else {
            winningScore = 20;
        }

        // Check if player won the game by comparing score to the input field
       if (scores[activePlayer] >= winningScore) {
        console.log('input value',winningScore);

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }


});

function nextPlayer() {
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active')

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active')

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

}
// 'init' used as callback by event listener function(no parantheses)
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// // var x = document.querySelector('#score-0').textContent;
// console.log("x", x);
