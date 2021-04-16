
var canvas1 = document.getElementById("canvas1");
var context1 = canvas1.getContext("2d");

var canvas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");

canvas2.classList.add('hide');

//Start screen using Canvas1
context1.strokeStyle = "green";
context1.font = '50px serif';
context1.strokeText("Ghost Chase", 150, 200);

context1.fillStyle = "purple";
context1.font = 'bold 25px Arial';
context1.fillText("Click screen to start", 160, 300);

//Hide first screen on Click & show Canvas2
canvas1.onclick = function() {
  canvas1.classList.add('hide');
  canvas2.classList.add('show');
}

// Loading player image
var playerImage = new Image();
playerImage.src = "https://i.postimg.cc/hGm38dT4/spritenormalright.png";

//Variables
var playerScore = 0;
var enemyScore = 0;
var playerX = 100;
var playerY = 100;


//Check player image ready & call render()
playerImage.onload = render();

//This function draws the background, the scoreboard & the player Sprite & then is called again & again by requestAnimationFrame()
 function render(){

   //Black background
    context2.fillStyle = "black";
    context2.fillRect(0,0, 600, 400);

   //Scoreboard
    context2.font = "20px Arial";
    context2.fillStyle = "white";
    context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

   //Player Sprite
    context2.drawImage(playerImage, playerX, playerY, 64,64);


//Redraw screen
    requestAnimationFrame(render);
  }

  //Update playerScore when screen clicked
   canvas2.onclick = function() {
     playerScore++;
    }

    //Player Move
    document.addEventListener('keydown', function (event) {

      if(event.key == "w"){
         playerY-=10;
      }
      else if(event.key == "s"){
        playerY+=10;
     }
      else if(event.key == "a"){
       playerX-=10;
    }
     else if(event.key == "d"){
      playerX+=10;
      }

    });
