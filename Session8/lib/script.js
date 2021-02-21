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


//Random number function
function myRandomNum(n){
  return Math.floor(Math.random() * n);
}

//Variables
var playerScore = 0;
var enemyScore = 0;
var powerUpAvailable = true; //so crystal can be seen


var playerSpritesheet = {
  leftNormalX: 64 * 4,
  rightNormalX: 64 * 5,
  upDownNormalX: 64 * 9,
  leftPoweredX: 64 * 6,
  rightPoweredX:64 * 7,
  upDownPoweredX: 64 * 10
}

var player = {
  x: 20,
  y: 0,
  facing: playerSpritesheet.rightNormalX,
  poweredUp: false
  }



var crystal = {
  x: myRandomNum(450),
  y: myRandomNum(250)
}

var countdown = 0;

//Loading player and POWERUP image
var playerImage = new Image();
playerImage.src = "https://i.postimg.cc/L8V2Xxch/CLCSpritesheet.png";

var crystalImage = new Image();
crystalImage.src = "https://i.postimg.cc/nc52ggMs/diamond-417896-640.png";

var backgroundImage = new Image();
backgroundImage.src = "https://i.postimg.cc/6qnPD68B/matrix-356024-640.jpg";

playerImage.onload = checkReady();


//Check Ready & PlayGame
function checkReady(){
   playerImage.ready=true; //playerImage
   crystalImage.ready = true;
   backgroundImage.ready = true;
   playGame();
 }

 function playGame(){
   render();
   requestAnimationFrame(playGame);
 }

//=============================================================//

//Rendering including Score Board & Sprites. NOT Movement. Separate function.
 function render(){

   //Background - updated below to load background image
   //context2.fillStyle = "black";
   //context2.fillRect(0,0, 600, 400);


//Draw background matrix image
context2.drawImage(backgroundImage, 0, 0, 600, 400);

//Scoreboard
context2.font = "20px Arial";
context2.fillStyle = "orange";
context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);


   //Draw POWERUP - USING RANDOM COORDINATES
   context2.drawImage(crystalImage, crystal.x, crystal.y, 32, 32);


//Draw Player last so goes over the crystal
   context2.drawImage(playerImage, player.facing, 0, 64, 64, player.x, player.y, 64,64);


   //crystalPosition();
   if(powerUpAvailable && crystal.countdown < 10){
     crystal.x = myRandomNum(450);
     crystal.y = myRandomNum(250);
     powerUpAvailable = false;
     player.poweredUp = false;
   }

//Crystal Collision Detection

if (player.x < crystal.x + 16 &&
   player.x + 32 > crystal.x &&
   player.y < crystal.y + 16 &&
   player.y + 32 > crystal.y) {
    console.log("Collision!!");
    crystal.countdown = 100; //Would add increased playerSpeed here & decrease enemySpeed && different sprites
    player.poweredUp = true;

}

   if(crystal.countdown > 0){
     crystal.countdown--;
     crystal.x = -20; //Hiding crystal
     crystal.y = -20; //Hiding crystal
     console.log(crystal.countdown);
     powerUpAvailable = true; //In readiness for it to be drawn again
   }
}


//=========================================================//

//Player Move
document.addEventListener('keydown', function (event) {
  move(event);
});

 function move(event){
   if(!player.poweredUp){

   if(event.key === "w"){
     player.y-=10;
     player.facing = playerSpritesheet.upDownNormalX;
  }
  if(event.key === "s"){
    player.y+=10;
    player.facing = playerSpritesheet.upDownNormalX;
 }
 if(event.key === "a"){
   player.x-=10;
   player.facing = playerSpritesheet.leftNormalX;
}
if(event.key === "d"){
  player.x+=10;
  player.facing = playerSpritesheet.rightNormalX;
}
} else {
  if(event.key === "w"){
    player.y-=10;
    player.facing = playerSpritesheet.upDownPoweredX;
 }
 if(event.key === "s"){
   player.y+=10;
   player.facing = playerSpritesheet.upDownPoweredX;
}
if(event.key === "a"){
  player.x-=10;
  player.facing = playerSpritesheet.leftPoweredX;
}
if(event.key === "d"){
 player.x+=10;
 player.facing = playerSpritesheet.rightPoweredX;
}
}

   render();

 }

} //End of game function
