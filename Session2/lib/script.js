var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
//context.fillText("Hello World", 10, 20);

// context.fillStyle="blue";
// context.fillRect(100, 100, 100,100);

// context.strokeStyle = "red";
// context.strokeRect (200, 200, 100, 100);
// context.font = '50px serif';
//
// context.strokeText("Hello World", 100, 100);

//Game code
context.strokeStyle = "green";
context.font = '50px serif';
context.strokeText("Ghost Chase", 150, 200);

context.fillStyle = "purple";
context.font = 'bold 25px Arial';
context.fillText("Click screen to start", 160, 300);

canvas.onclick = function() { alert("Game starting..."); }
