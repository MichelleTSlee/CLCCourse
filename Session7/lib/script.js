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

// Loading images
var playerImage = new Image();

//Using spritesheet
playerImage.src = "https://i.postimg.cc/L8V2Xxch/CLCSpritesheet.png";

var crystalImage = new Image();
crystalImage.src = "https://i.postimg.cc/nc52ggMs/diamond-417896-640.png";

//Variables
var playerScore = 0;
var enemyScore = 0;
var playerX = 100;
var playerY = 100;
var crystalX = myRandomNum(450);
var crystalY = myRandomNum(250);

//Calculate numbers for x value on spritesheet which selects correct sprite. Y is 0 as only one row & top left starts at 0
var leftNormal = 64 * 4;
var rightNormal = 64 * 5;
var upDownNormal = 64 * 9;

//Set starting position
var spritesheetX = rightNormal; //x value
var spritesheetY = 0; //y


//Check player image ready & call render()
playerImage.onload = render();

//This function draws the background, the scoreboard & the Sprites
 function render(){

   //Black background
    context2.fillStyle = "black";
    context2.fillRect(0,0, 600, 400);

   //Scoreboard
    context2.font = "20px Arial";
    context2.fillStyle = "white";
    context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

    //Show crystal
    context2.drawImage(crystalImage, crystalX, crystalY, 32, 32);

    //Player Sprite
    context2.drawImage(playerImage, spritesheetX, spritesheetY, 64, 64, playerX, playerY, 64, 64);//args 2-5 relate to te spritesheet.

    //Crystal collision detection
    if (playerX < crystalX + 32 &&
      playerX + 32 > crystalX &&
      playerY < crystalY + 32 &&
      playerY + 32 > crystalY) {
            hideCrystal();
       }

    //Redraw screen
    requestAnimationFrame(render);
  }

    function hideCrystal(){
        crystalX = -20;
        crystalY = -20; 
        setTimeout(showCrystal, 5000);
      }

      function showCrystal(){
        crystalX = myRandomNum(450);
        crystalY = myRandomNum(250);
      }


    //Player Move Keydown Event Listener
    document.addEventListener('keydown', playerMove); //Have simplified this code

//Player Move function
    function playerMove(event){
      if(event.key == "w"){
         playerY-=10;
         spritesheetX = upDownNormal;
      }
      else if(event.key == "s"){
        playerY+=10;
        spritesheetX = upDownNormal;
     }
      else if(event.key == "a"){
       playerX-=10;
       spritesheetX = leftNormal;
     }
     else if(event.key == "d"){
      playerX+=10;
      spritesheetX = rightNormal;
    }
//Player reappears on left if goes off screen right & vice versa & top/bottom too
      if(playerX > canvas2.width- 32){
        playerX = 0
      };

      if(playerX < 0 - 32){
        playerX = canvas2.width-32
      };

      if(playerY > canvas2.height-32){
        playerY = 0
      };
      if(playerY < 0 - 32){
        playerY = canvas2.height-32
      };
    };


//==============================================================//
    //Update playerScore when screen clicked
     canvas2.onclick = function() {
       playerScore++;
      }
  //==============================================================//

//New function for random number
    function myRandomNum(num){
      return Math.floor(Math.random() * num);
      }
//==============================================================//
