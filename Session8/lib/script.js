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
  }

  //==============================================================//
  //Random number function
  function myRandomNum(n){
  return Math.floor(Math.random() * n);
  //console.log(Math.floor(Math.random() * n));
  }

//==============================================================//
//Variables
var playerScore = 0;
var enemyScore = 0;
var playerX = 0;
var playerY = 20;
var crystalX = myRandomNum(450);
var crystalY = myRandomNum(250);
var countdown = 0;
var powerUpAvailable = false;


//==============================================================//
//Loading player image
var playerImage = new Image();
playerImage.src = "https://i.postimg.cc/hGm38dT4/spritenormalright.png";

var crystalImage = new Image();
crystalImage.src = "https://i.postimg.cc/nc52ggMs/diamond-417896-640.png";

var backgroundImage = new Image();
backgroundImage.src = "https://i.postimg.cc/6qnPD68B/matrix-356024-640.jpg";



playerImage.onload = checkReady();

 //Check Ready & PlayGame
 function checkReady(){
    playerImage.ready=true;
    crystalImage.ready = true;
    backgroundImage.ready = true;
    playGame();
  }

  function playGame(){
    render();
    requestAnimationFrame(playGame);
  }

  //=============================================================//

  function render(){

    //Black background
    // context2.fillStyle = "black";
    // context2.fillRect(0,0, 600, 400);

    //New backgroundImage//Draw background matrix image
    context2.drawImage(backgroundImage, 0, 0, 600, 400);


    //Scoreboard
    context2.font = "20px Arial";
    context2.fillStyle = "orange";
    context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

    //Draw POWERUP - USING RANDOM COORDINATES
    //context2.drawImage(crystalImage, 100, 100, 32, 32);
    context2.drawImage(crystalImage, crystalX, crystalY, 32, 32);


  //Draw Sprite
    //context2.drawImage(playerImage, 0, 20, 64,64);
    context2.drawImage(playerImage, playerX, playerY, 64,64);


  //crystalPosition();
  if(!powerUpAvailable && countdown < 10){
    crystalX = myRandomNum(450);
    crystalY = myRandomNum(250);
    powerUpAvailable = true;
  }

//Crystal Collision Detection

if (playerX < crystalX + 16 &&
  playerX + 32 > crystalX &&
  playerY < crystalY + 16 &&
  playerY + 32 > crystalY) {
   console.log("Collision!!");
   countdown = 100; //Would add increased playerSpeed here & decrease enemySpeed && different sprites
}

  if(countdown > 0){
    countdown--;
    crystalX = -20; //Hiding crystal
    crystalY = -20; //Hiding crystal
    console.log(countdown);
    powerUpAvailable = false;
  }

}

//Player Move
document.addEventListener('keydown', function (event) {
  move(event);
});

 function move(event){
   if(event.key === "w"){
     playerY-=10;
  }
  if(event.key === "s"){
    playerY+=10;
 }
 if(event.key === "a"){
   playerX-=10;
}
if(event.key === "d"){
  playerX+=10;
 }
}
