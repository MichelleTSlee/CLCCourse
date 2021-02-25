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

//==============================================================//
//Variables
var playerScore = 0;
var enemyScore = 0;
var playerX = 0;
var playerY = 20;
var crystalX = myRandomNum(450);
var crystalY = myRandomNum(250);


//==============================================================//
//Loading player image
var playerImage = new Image();
playerImage.src = "https://i.postimg.cc/hGm38dT4/spritenormalright.png";

var crystalImage = new Image();
crystalImage.src = "https://i.postimg.cc/nc52ggMs/diamond-417896-640.png";


playerImage.onload = checkReady();

 //Check Ready & PlayGame
 function checkReady(){
    playerImage.ready=true;
    crystalImage.ready = true;
    playGame();
  }

  function playGame(){
    render();
    requestAnimationFrame(playGame);
  }

  //=============================================================//

  function render(){

    //Black background
    context2.fillStyle = "black";
    context2.fillRect(0,0, 600, 400);

    //Scoreboard
    context2.font = "20px Arial";
    context2.fillStyle = "green";
    context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

  //Draw Sprite
    //context2.drawImage(playerImage, 0, 20, 64,64);
    context2.drawImage(playerImage, playerX, playerY, 64,64);


  //Draw POWERUP - USING RANDOM COORDINATES
  //context2.drawImage(crystalImage, 100, 100, 32, 32);
  context2.drawImage(crystalImage, crystalX, crystalY, 32, 32);

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
