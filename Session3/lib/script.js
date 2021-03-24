
     var canvas = document.getElementById("canvas");
     var context = canvas.getContext("2d");

     context.strokeStyle = "green";
     context.font = '50px serif';
     context.strokeText("Ghost Chase", 150, 200);

     context.fillStyle = "purple";
     context.font = 'bold 25px Arial';
     context.fillText("Click screen to start", 160, 300);

      canvas.onclick = function() {
        alert("Game starting...");
     }




// var canvas1 = document.getElementById("canvas1");
// var canvas2 = document.getElementById("canvas2");
// var context1 = canvas1.getContext("2d");
// var context2 = canvas2.getContext("2d");
//
// canvas2.classList.add('hide');
//
// // //Start screen using Canvas1
// context1.strokeStyle = "green";
// context1.font = '50px serif';
// context1.strokeText("Ghost Chase", 150, 200);
//
// context1.fillStyle = "purple";
// context1.font = 'bold 25px Arial';
// context1.fillText("Click screen to start", 160, 300);
//
// // Hide first screen on Click & show Canvas2
// canvas1.onclick = function() {
//   canvas1.classList.add('hide');
//   canvas2.classList.add('show');
// }
//
// //Placeholder text for Canvas2
// context2.strokeStyle = "red";
// context2.font = '50px serif';
// context2.strokeText("Game Screen!!!", 150, 200);
//
//
// // Loading player image
// var playerImage = new Image();
// playerImage.src = "https://i.postimg.cc/hGm38dT4/spritenormalright.png";
//
// playerImage.onload = function() {
//   context2.drawImage(playerImage, 0, 20, 64,64);
// };
