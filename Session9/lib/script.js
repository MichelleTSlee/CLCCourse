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

// Setting spritesheet as image source
var mainSpritesheet = new Image();
mainSpritesheet.src = "https://i.postimg.cc/L8V2Xxch/CLCSpritesheet.png";

var crystalImage = new Image();
crystalImage.src = "https://i.postimg.cc/nc52ggMs/diamond-417896-640.png";

//Variables
//Scores at start
var playerScore = 0;
var enemyScore = 0;

//player sprite X & Y position at start
var playerX = 100;
var playerY = 100;

//crystal x and y position at start using myRandomNum function (see further down in code)
var crystalX = myRandomNum(450);
var crystalY = myRandomNum(250);

//enemy sprite X & Y position at start
var enemyX = 200;
var enemyY = 200;

//These booleans change depending on whether scoring is allowed and whether player is powered Up or not
var canScore = true;
var playerPoweredUp = false;

//Calculate x values for the different sprites in spritesheet so we can select the one we want to use

var playerLeftNormal = 64 * 4; //This is just an easy way of calculating the X value based on width of each sprite (64px) and the position of the sprite in the row
var playerRightNormal = 64 * 5;
var playerUpDownNormal = 64 * 9;

var playerLeftPoweredUp = 64 * 6;
var playerRightPoweredUp = 64 * 7;
var playerUpDownPoweredUp = 64 * 10;

var enemyLeftNormal = 0;
var enemyRightNormal = 64 * 2;
var enemyUpDownNormal = 64 * 8;


//New S9 variables
var enemy = false;
var enemyDirectionChangeCountdown = 0;
var enemyXToChangeByThisAmount;
var enemyYToChangeByThisAmount;




//Set starting position of PLAYER
var playerSpritesheetX = playerRightNormal; //ie sprite at X=64 * 5
var playerSpritesheetY = 0;

//SET STARTING POSITION OF ENEMY
var enemySpritesheetX = enemyLeftNormal; //ie sprite at X=0
var enemySpritesheetY = 0; //y

//Check main image ready & call render()
mainSpritesheet.onload = render();

//This function draws the background, the scoreboard & the Sprites
function render() {

  //Black background
  context2.fillStyle = "black";
  context2.fillRect(0, 0, 600, 400);

  //Scoreboard
  context2.font = "20px Arial";
  context2.fillStyle = "white";
  context2.fillText("Player: " + playerScore + " Enemy: " + enemyScore, 10, 20);

  //Show crystal
  context2.drawImage(crystalImage, crystalX, crystalY, 32, 32);

  //Player Sprite
  context2.drawImage(mainSpritesheet, playerSpritesheetX, playerSpritesheetY, 64, 64, playerX, playerY, 64, 64); //args 2-5 relate to the spritesheet.

  //Enemy Sprite
  context2.drawImage(mainSpritesheet, enemySpritesheetX, enemySpritesheetY, 64, 64, enemyX, enemyY, 64, 64); //args 2-5 relate to the spritesheet.

  //Crystal collision detection
  if (playerX < crystalX + 32 && playerX + 32 > crystalX && playerY < crystalY + 32 && playerY + 32 > crystalY) {
    hideCrystal();
  }

  //PLAYER & ENEMY COLLISION DETECTION
  if (playerX < enemyX + 32 && playerX + 32 > enemyX && playerY < enemyY + 32 && playerY + 32 > enemyY) {

    //Checks if scoring allowed (we want a 5 sec delay otherwise the render rate means too many collisions detected and the score just goes up and up! We call a pauseScoring function for that delay.  Also checks if player can score (if powered up) or enemy (if player not powered up))
    if (canScore && !playerPoweredUp) {
      enemyScore++;
      pauseScoring();
    } else if (canScore && playerPoweredUp) {
      playerScore++;
      pauseScoring();
    }
  }

  //Enemy automated movement
  //Spawn enemy at random location
  if (!enemy) {
    enemyX = myRandomNum(450);
    enemyY = myRandomNum(250) + 30; //So not too close to top
    enemy = true; //so we dion;'t keeop creating enemies'
  }

  if (enemyDirectionChangeCountdown < 1) {
    enemyDirectionChangeCountdown = myRandomNum(40); //Explain function. So number between 1-40.Will likely be a different number each time & we change either x or y depending on whether it's odd or even (see below) as well as just setting a countdown until the calculation is done again that also changes each time as the number is random. So this is key to keeping the movement unpredictable so enemy keeps changing x or y direction at different intervals.
    enemyXToChangeByThisAmount = 0;
    enemyYToChangeByThisAmount = 0;
    //
    if (enemyDirectionChangeCountdown % 2) { //Even
      if (playerX < enemyX) { //so player to left of enemy
        enemyXToChangeByThisAmount = -1; // eg -1. Makes it a negative so enemy will move left.
        enemySpritesheetX = enemyLeftNormal;//Moving left so need facing left sprite
      } else {
        enemyXToChangeByThisAmount = 1; //eg 1. Stays positive so enemy will move right.
        enemySpritesheetX = enemyRightNormal;//Moving right so need facing right sprite
      }
    } else { //if time until enemy changes direction is an odd number
      if (playerY < enemyY) { //so player above enemy
        enemyYToChangeByThisAmount = -1; //eg -1. Makes it a negative. So enemy moves up.
      } else {
        enemyYToChangeByThisAmount = 1; //eg 1. Stays positive. Enemy moves  down.
      }
    }
  }

  enemyDirectionChangeCountdown--; //When less than zero calculates new number and above is recalculated

  enemyX = enemyX + enemyXToChangeByThisAmount; //Wherever he started plus or minus 1- so increasing x or decreasing x
  enemyY = enemyY + enemyYToChangeByThisAmount; //Wherever he started plus or minus 1- so increasing y or decreasing y

  //        Enemy reappears on left if goes off screen right & vice versa & top/bottom too
  if (enemyX > canvas2.width - 32) {
    enemyX = 0
  };

  if (enemyX < 0 - 32) {
    enemyX = canvas2.width - 32
  };

  if (enemyY > canvas2.height - 32) {
    enemyY = 0
  };
  if (enemyY < 0 - 32) {
    enemyY = canvas2.height - 32
  };

  //Redraw screen
  requestAnimationFrame(render);
}

function hideCrystal() {
  crystalX = -20;
  crystalY = -20;
  playerPoweredUp = true; //Because player has collided with crystal
  setTimeout(showCrystal, 5000); //Calls showCrystal function after 5 seconds
}

function showCrystal() {
  crystalX = myRandomNum(450);
  crystalY = myRandomNum(250);
  playerPoweredUp = false; //Once crystal has reappeared player is no longer powered up
}

function pauseScoring() {
  canScore = false;
  setTimeout(resumeScoring, 5000); //gives us a 5 second delay in scoring then calls the resumeScoring function
}

function resumeScoring() {
  canScore = true; //changes canScore boolean so player or enemy can score again
}

//Player Move Keydown Event Listener
document.addEventListener('keydown', playerMove);

function playerMove(event) {
  if (!playerPoweredUp) { //If not powered up uses normal sprite for left, right, up/down & travels at normal speed
    if (event.key == "w") {
      playerY -= 10;
      playerSpritesheetX = playerUpDownNormal;
    } else if (event.key == "s") {
      playerY += 10;
      playerSpritesheetX = playerUpDownNormal;
    } else if (event.key == "a") {
      playerX -= 10;
      playerSpritesheetX = playerLeftNormal;
    } else if (event.key == "d") {
      playerX += 10;
      playerSpritesheetX = playerRightNormal;
    }
  } else if (playerPoweredUp) { //If poweredUp uses poweredUp sprite for left, right, up/down & travels faster
    if (event.key == "w") {
      playerY -= 20;
      playerSpritesheetX = playerUpDownPoweredUp;
    } else if (event.key == "s") {
      playerY += 20;
      playerSpritesheetX = playerUpDownPoweredUp;
    } else if (event.key == "a") {
      playerX -= 20;
      playerSpritesheetX = playerLeftPoweredUp;
    } else if (event.key == "d") {
      playerX += 20;
      playerSpritesheetX = playerRightPoweredUp;
    }
  }

  //Player reappears on left if goes off screen right & vice versa & top/bottom too
  if (playerX > canvas2.width - 32) {
    playerX = 0
  };

  if (playerX < 0 - 32) {
    playerX = canvas2.width - 32
  };

  if (playerY > canvas2.height - 32) {
    playerY = 0
  };
  if (playerY < 0 - 32) {
    playerY = canvas2.height - 32
  };
};

//Function for random number
function myRandomNum(num) {
  return Math.floor(Math.random() * num);
}
//==============================================================//
