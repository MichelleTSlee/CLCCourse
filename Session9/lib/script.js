
//REVIEW - USE
//New S8 variables
var enemy = false;
var enemyTimeUntilChangeDir = 0;
var dirRandomiser;
var enemyDirX;
var enemyDirY;

//New for S8
var spritesheetEnemySelectX = enemyLeftNormal;
var spritesheetEnemySelectY = 0; //y


       //Enemy Move
       if(!enemy){
         enemyX = myRandomNum(450);
         enemyY = myRandomNum(250) + 30;//So not too close to top
         enemy=true;
       }

       if (enemyTimeUntilChangeDir < 1) {
         enemyTimeUntilChangeDir = myRandomNum(40);//eg 38. You want it around here as it's a change of dir countdown
         dirRandomiser = myRandomNum(2) + 1; //Could be 0 otherwise. Even when I increased to 4. This random number gives random change of direction too.
         enemyDirX = 0;
         enemyDirY = 0;

         if(enemyTimeUntilChangeDir % 2){ //Even
           if(playerX < enemyX){
             enemyDirX = -dirRandomiser; // eg -1
             spritesheetEnemySelectX = enemyLeftNormal;
           } else {
             enemyDirX = dirRandomiser; //eg 1
             spritesheetEnemySelectX = enemyRightNormal;
           }
         } else {
           if (playerY < enemyY){
             enemyDirY = -dirRandomiser;
            } else {
             enemyDirY = dirRandomiser;
            }
         }
       }

       enemyTimeUntilChangeDir--;

       enemyX = enemyX + enemyDirX; //Wherever he started plus or minus 1
       enemyY = enemyY + enemyDirY; //Wherever he started plus or minus 1

       //Enemy reappears on left if goes off screen right & vice versa & top/bottom too
             if(enemyX > canvas2.width- 32){
               enemyX = 0
             };

             if(enemyX < 0 - 32){
               enemyX = canvas2.width-32
             };

             if(enemyY > canvas2.height-32){
               enemyY = 0
             };
             if(enemyY < 0 - 32){
               enemyY = canvas2.height-32
             };

  
