/* Getting a button and adding the event listener in differnt ways
1. Creating the fuction separately and then calling it in the event listner:
i.e: adding a function
document.querySelector("button").addEventListener("click", handleClick);

function handleClick(){
  alert("I got clicked!");
}
or

2. Adding it anonomous function within the event listener

i.e: adding an anonomous function(function with no name )
document.querySelector("button").addEventListener("click", function (){
// What to do when the click is detected
alert("I got clicked!");
});
*/

// this for loop is to add an alert to each button when clicked
// selecting the drum class makes it to be more specific, as opposed to using
// "button". If were to use "button" ths will effect other buttons that may be
// created in the future
// querySelectorAll - puts all selected items into an array
//------------------------------------------------------------------------------

// Detecting button press
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {

  document.querySelectorAll(".drum")[i].addEventListener("click", function () {

    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
  // use keydown
}

// detecting keyboard press
document.addEventListener("keydown", function (event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});


/*
  The purpose of makeSound() function is to get the corresponding sound for the button that 
  was pressed. 
  Parameters: 
    @key - key that the user pressed 
*/
function makeSound(key) {

  switch (key) {
    case "W":
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;

    case "A":
    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;

    case "S":
    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;

    case "D":
    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;

    case "J":
    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;

    case "K":
    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;

    case "L":
    case "l":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;

    default:
      break;

  }
}

/*
  The purpose of buttonAnimation() function is to add feedback that the button
  was pressed/clicked 
  Parameters: 
    @currentKey - key that the user pressed 
*/
function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  //adding the CSS to button that was clicked
  activeButton.classList.add("pressed");

  // delay so the button goes back as if it were not pressed
  // this function takes in two parameters 1. function and 2. time duration
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100); //time duration
}
