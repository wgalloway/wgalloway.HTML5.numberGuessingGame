// Game Variables
var mysteryNum = Math.floor(Math.random() * 100);
var playerGuess;
var remainGuesses = 10;
var guessMade = 0;
var gameSate = "";
var gameWon = false;

// Connect HTML element tags to Javascript

// Input and Output
var input = document.querySelector('#input');
var output = document.querySelector('#output');

// Button
var button = document.querySelector('button');
button.style.cursor = "pointer";
// Add a event lister to button
button.addEventListener("click", clickHandler, false);

// Enter key
window.addEventListener("keydown", keydownHandler, false);
function keydownHandler(event){
  // Enter key code is 13
  if(event.keyCode === 13) {
    validateGuess();
  }
}

// Arrow
var arrow = document.querySelector('#arrow');

function render(){
  // Position the arrow
    // multiply player guess by 3
    // move arrow's pixel position on the scale 
    arrow.style.left = playerGuess * 3 + 'px';
}

function clickHandler(){
  validateGuess();
}

function validateGuess() {
  playerGuess = parseInt(input.value);

  if(isNaN(playerGuess)) {
    output.innerHTML = "Please enter a number.";
  } else if(playerGuess < 0 || playerGuess > 99) {
    output.innerHTML = "Please enter a number between 0 and 99.";
  } else {
    playGame();
  }
}

function endGame(){
  if(gameWon){
    output.innerHTML
	  = "Yes, it's " + mysteryNum + "!" + "<br>"
	  + "It only took you " + guessMade + " guesses.";
  } else {
    output.innerHTML
	  = "No more guesses left!" + "<br>"
	  + "The number was: " + mysteryNum + ".";
  }
  
  // Disable button and remove clickHandler
  button.removeEventListener("click", clickHandler, false);
  button.disabled = true;

  // Remove keyHandler
  window.removeEventListener("keydown", keydownHandler, false);

  // Disable the input field
  input.disabled = true;
}

function playGame(){
  remainGuesses--;
  guessMade++;
  gameState = " Guess: " + guessMade + ", Remaining: " + remainGuesses;

  // Grab value from input field
  playerGuess = parseInt(input.value);
  
  if(playerGuess > mysteryNum){
    output.innerHTML = "Guess is too high." + gameState;
    if(remainGuesses < 1) {
      endGame()
    }
  } else if(playerGuess < mysteryNum) {
    output.innerHTML = "Guess is too low." + gameState;
    if(remainGuesses < 1) {
      endGame()
    }
  } else if(playerGuess === mysteryNum){
    gameWon = true;
    endGame()
  }

  render();
}
