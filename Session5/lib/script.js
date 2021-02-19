var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var context1 = canvas1.getContext("2d");
var context2 = canvas2.getContext("2d");

canvas2.classList.add('hide');

//Start screen using Canvas1 & Context1
context1.strokeStyle = "green";
context1.font = '50px serif';
context1.strokeText("Ghost Chase", 150, 200);

context1.fillStyle = "purple";
context1.font = 'bold 25px Arial';
context1.fillText("Click screen to start", 160, 300);


//Hide first screen on Click & show Canvas2/Context2
canvas1.onclick = function() {
  canvas1.classList.add('hide');
  console.log("Canvas1 gone");
  canvas2.classList.add('show');
  console.log("Now using canvas2");
  game();
}
//==============================================================//

//Key Down demo
document.addEventListener('keydown', function(event) {
  console.log(event);
  if (event.key == "w"){
    console.log("W was pressed");
  } else {
    console.log("W was not pressed");
  }
});

//If Syntax
// if(thing to test){
//   DO THIS IF THING TO TEST IS TRUE
// } else {
//   DO SOMETHING ELSE
// }

//==============================================================//

function game (){
//Variables
var playerScore = 0;
var enemyScore = 0;

var player = {
  x: 20,
  y: 0
}


//KeyClick Listeners
// var keyClick = {};
//
// document.addEventListener("keydown", function(event){
//   keyClick[event.keyCode] = true;
//   console.log(event);
//   console.log(keyClick);
//   move(keyClick);
// }, false);
//
// document.addEventListener("keyup", function(event){
//   delete keyClick[event.keyCode];
//   console.log(event);
//   console.log(keyClick);
// }, false);




//Loading player image
var playerImage = new Image();

playerImage.src = "https://i.postimg.cc/hGm38dT4/spritenormalright.png";


playerImage.onload = checkReady();




//Check Ready & PlayGame
function checkReady(){
   playerImage.ready=true;
   playGame();
 }

 function playGame(){
   render();
   //playerScore++;
   requestAnimationFrame(playGame);
 }

//=============================================================//

//Rendering including Score Board & Sprites. NOT Movement. Separate function.
 function render(){

   context2.fillStyle = "black";
   context2.fillRect(0,0, 600, 400);

   //Scoreboard
   context2.font = "20px Arial";
   context2.fillStyle = "green";
   context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

//Draw Sprite
   context2.drawImage(playerImage, player.x, player.y, 64,64);
}


//=========================================================//

//Player Move
document.addEventListener('keydown', function (event) {
  move(event);
});

 function move(event){
   if(event.key === "w"){
     player.y-=10;
  }
  if(event.key === "s"){
    player.y+=10;
 }
 if(event.key === "a"){
   player.x-=10;
}
if(event.key === "d"){
  player.x+=10;
}


   render();

 }


}//End of game function
