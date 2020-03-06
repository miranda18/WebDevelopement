// array carrying the different colors for the game
var buttonColors = ["red", "blue", "green", "yellow"];

// array to hold the game sequence
var gamePattern = [];

// array to hold what button the user has chosen
var userClickedPattern = [];

// variable to hold if any key was pressed
var started = false;

// holds the level of the game the user is on
var level = 0;

//EventHandler to detect when a keyboard key has been pressed. One a key is
// is pressed for the first time, "nextSequence" is called
$(document).keydown(function() {
  if (!started) {
    // when the game has started, h1 title switches to say the level the user is
    // on initially sets it to 0
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

// This EventHandler is to detect when any of the buttons are clicked
$(".btn").click(function() {
  // stores the id of the button the got clicked
  var userChosenColor = $(this).attr("id");

  // this array holds the buttons that the user has chosen
  userClickedPattern.push(userChosenColor);

  //$("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(userChosenColor);

  // plays sound when the user clicks on a button
  playSound(userChosenColor);

  // checks user's last button press
  checkAnswer(userClickedPattern.length - 1);

  // check to see what color the user chose
  // console.log("User chosen color: " + userChosenColor);
});

/*
  The function: "nextSequence" generates a random index number(between 0-3) in
                 order to get a random color from the buttonColors array. It then
                 appends that color onto the gamePattern array.
*/
function nextSequence() {

  // everytime nextSequenceis called, userClickedPattern is reset
  userClickedPattern = [];

  // increments level
  level++;
  $("#level-title").text("Level " + level);

  //replayGameSequence();
  // generates a random number between 0 and 3
  var randomNumber = Math.floor((Math.random() * 4));

  // holds the color to be appeneded to the game sequence (i.e gamePattern array)
  var randomChosenColor = buttonColors[randomNumber];

  // random color gets pushed to gamePattern array
  gamePattern.push(randomChosenColor);

  // check to see if pattern is correct
  // console.log("This game pattern: " + gamePattern);

  //animating the button that is in the game sequence
  //$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(randomChosenColor);

  //playing the audio of the button in the game sequence
  playSound(randomChosenColor);
}

/*
  The function: "playSound" plays the button sound
  Parameters:    the function takes in a single parameter of the current color
                 to play
*/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/*
  The function: "animatePress" creates an animation on the button that was
                 pressed.
  Parameters:    the function takes in a single parameter of the current color
                 that was pressed
*/
function animatePress(currentColor) {
  // adds "pressed" class
  $("#" + currentColor).addClass("pressed");

  // removes "pressed" class to imitate a button click
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 300);
}

/*
  The function: "checkAnswer" checks userClickedPattern vs gamePattern
                 to check if it is matching
  Parameters:    currentLevel -  passes in which level the user is on
*/
function checkAnswer(currentLevel) {

  // if the user got the answer correct
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //console.log("Success!")
    // if the user got the most recent correct, check if they have finished
    // their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // call nextSequence after 1000 millisecond delay
      setTimeout(function() {
      //  console.log("inside checkAnswer -> setTimeout function: " + userClickedPattern[currentLevel]);
      replaySequence(gamePattern);

      }, 1000);
    }
  }

  // the user got the answer wrong
  else {
    //check to output to the console that the answer was wrong
    //console.log("Sorry, thats wrong!");

    // plays error sound when user gets the pattern wrong
    playSound("wrong");

    // the addClass and remove class gives a visual cue to the user that an
    // error has been made
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // The title changes prompting the user if they would like to restart the game
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // game restarts
    startOver();
  }
}

/*
  The function: "startOver" resets all values back to what they were initially
                 in order for the user to restart the game
*/
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

/*
The function: "replaySequence" replays the gamePattern before calling
               nextSequence to add new color to the sequence
Parameters:    arraySequence - the array to be traversed through in order to
                               get the button colors to play
*/
function replaySequence(arraySequence) {
  var seconds = 1000;
  var nextSequenceSeconds = 100; // 250

  for (var i = 0; i < arraySequence.length; i++) {

  //  console.log("INSIDE replaySequence function: " + arraySequence[i]);

    replaySound(arraySequence[i], seconds);
    seconds += 1000;
  }

  nextSequenceSeconds += seconds;

 // this setTimeout ensures that the gamepattern plays in full before nextSequence()
 // and a new button is added
 setTimeout(function(){
    nextSequence();
 }, nextSequenceSeconds);

}

/*
The function: "replaySound" replays the button sound
Parameters:    name - name of the button to be played
               time - amount of seconds each button plays
*/
function replaySound(name, time) {
  setTimeout(function() {
    animatePress(name);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    //console.log("INSIDE replaySound function: " + name)
  }, time);
}
