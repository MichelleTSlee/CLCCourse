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


function game (){


  //Math Random demo
//console.log(Math.random());
//console.log(Math.floor(Math.random()));
//console.log(Math.floor(Math.random() * 10));

//Random number function
function myRandomNum(n){
  return Math.floor(Math.random() * n);
  //console.log(Math.floor(Math.random() * n));
}

// myRandomNum(450);
// myRandomNum(250);

//Variables
var playerScore = 0;
var enemyScore = 0;

var player = {
  x: 20,
  y: 0
}

//3nd iteration - crystal object - 1st iteration hard codes x and y in render() drawImage(). 2nd uses x and y = 100 here. 3rd uses random
var crystal = {
  // x: 100,
  // y: 100
  x: myRandomNum(450),
  y: myRandomNum(250)
}


//Loading player and POWERUP image
var playerImage = new Image();
playerImage.src = "https://i.postimg.cc/hGm38dT4/spritenormalright.png";

var crystalImage = new Image();
crystalImage.src = "https://i.postimg.cc/nc52ggMs/diamond-417896-640.png";


playerImage.onload = checkReady();


//Check Ready & PlayGame
function checkReady(){
   playerImage.ready=true; //playerImage
   crystalImage.ready = true;
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

//Draw Player
   context2.drawImage(playerImage, player.x, player.y, 64,64);


//Draw POWERUP - USING RANDOM COORDINATES
//context2.drawImage(crystalImage, 100, 100, 32, 32);
context2.drawImage(crystalImage, crystal.x, crystal.y, 32, 32);


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
