var colorPicker = ["green","red","yellow","blue"]
var numberPicker = {"green":0,"red":1,"yellow":2,"blue":3}
var gamePattern = []
var userPattern = []
var level = 0
var keyState = 0

$(document).on("keydown", function(){

  if (keyState === 0) {
  generateNewColor()
  userPattern = []
  keyState++
  }

  if (keyState === 2) {
  $("h1").html("Press A Key to Start")
  keyState = 0
  }

})

function generateNewColor() {

  var randomNumber = Math.floor(Math.random()*4)
  var randomColor = colorPicker[randomNumber]
  gamePattern.push(randomNumber)

  level++
  $("h1").html("level " + level)

  $("#"+randomColor).animate({opacity:0}, 200)
  $("#"+randomColor).animate({opacity:1}, 200)

  userPattern = []
}

function checker() {

  if (userPattern.length < gamePattern.length){
    if (userPattern[userPattern.length - 1] !== gamePattern[userPattern.length-1]) {
  gameOver()
  }}

  if (userPattern.length === gamePattern.length){
    if (userPattern[userPattern.length - 1] !== gamePattern[userPattern.length-1]) {
  gameOver();
    }
    else {
  levelUp();
  }}
}

function levelUp() {
  setTimeout(function () {
  generateNewColor()
  }, 1500);
}

function gameOver() {
  $("body").addClass("game-over")
  keyState++
  userPattern = []
  gamePattern = []
  level = 0
  var wrong = new Audio("sounds/wrong.mp3")
  wrong.play()
  $("h1").html("Game over, press Any Key to Restart")
  setTimeout(function () {
  $("body").removeClass("game-over")
  }, 200);
}

$(".btn").on("mousedown", function(){
  $("#" + this.id).addClass("pressed")
})

$(".btn").on("mouseup", function(){
  $("#" + this.id).removeClass("pressed")
  userPattern.push(numberPicker[this.id])
  clickSound(this.id)
  checker()
})

//PLAY SOUND
function clickSound(color) {
  var clickSound = new Audio("sounds/" + color + ".mp3")
  clickSound.play()
  }
