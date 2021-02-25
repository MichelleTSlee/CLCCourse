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
//Variables
var playerScore = 0;
var enemyScore = 0;
var playerX = 0;
var playerY = 20;

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
  }

  //Key Down demo
  // document.addEventListener('keydown', function(event) {
  //   console.log(event);
  //   if (event.key == "w"){
  //     console.log("W was pressed");
  //   } else {
  //     console.log("W was not pressed");
  //   }
  // });

  //If Syntax
  // if(thing to test){
  //   DO THIS IF THING TO TEST IS TRUE
  // } else {
  //   DO SOMETHING ELSE
  // }



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
