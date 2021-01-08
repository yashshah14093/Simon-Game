var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = 0,level = 0;

$(".btn").click(handleButtonClick);

$(document).keypress(function () {
  if(start == 0){
    start = 1;
    $("h1").html("Level "+level);
    nextSequence();
  }else {
    nextSequence();
  }
});


function handleButtonClick() {
  color = $(this).attr("id");
  userClickedPattern.push(color);
  animatePress(color);
  checkAnswer(userClickedPattern.length - 1);
}


function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence()
      },1000);
    }
  }else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  start = 0;
  userClickedPattern = [];
}


function nextSequence() {
  randomNumber = Math.floor(Math.random()*4)
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  level += 1;
  $("h1").html("Level "+level);
  userClickedPattern = [];
}


function playSound(chosenColor) {
  filename = "sounds/" + chosenColor + ".mp3";
  var audio = new Audio(filename);
  audio.play();
}


function animatePress(chosenColor) {
  $("#"+chosenColor).addClass("pressed");
  playSound(chosenColor);
  setTimeout(function () {
    $("#"+chosenColor).removeClass("pressed");
  },100)
}
