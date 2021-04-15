const playAgainBtn = document.querySelector("#playAgainBtn");

function playGame() {
  // Random number for left dice
  var randomNumber1 = Math.floor(Math.random() * 6) + 1; // 0-5.99999
  var randomDiceImage1 = "images/dice" + randomNumber1 + ".png";

  // Random number for right dice
  var randomNumber2 = Math.floor(Math.random() * 6) + 1; // 0-5.99999
  var randomDiceImage2 = "images/dice" + randomNumber2 + ".png";

  // Changes left dice to change image
  document.querySelector(".img1").src = randomDiceImage1;

  // Changes right dice to change image
  document.querySelector(".img2").src = randomDiceImage2;

  // If Statement to determine the winner
  if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
  }
  else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
  }
  else {
    document.querySelector("h1").innerHTML = "DRAW!!";
  }
}

playGame();

playAgainBtn.addEventListener("click", function (e) {
  playGame();
});
