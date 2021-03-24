
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//Game code
context.strokeStyle = "green";
context.font = '50px serif';
context.strokeText("Ghost Chase", 150, 200);

context.fillStyle = "purple";
context.font = 'bold 25px Arial';
context.fillText("Click screen to start", 160, 300);

 canvas.onclick = function() {
   alert("Game starting...");
}
