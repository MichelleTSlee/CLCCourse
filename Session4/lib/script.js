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

//Variables

 var playerScore = 0;
 var enemyScore = 0;



//=============================================================//
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

  function render(){

    //Scoreboard
    context2.font = "20px Arial";
    context2.fillStyle = "green";
    context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

  //Draw Sprite
    context2.drawImage(playerImage, 0, 20, 64,64);
  }
