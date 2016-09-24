var io = require('socket.io').listen(http);
function setup() {
    createCanvas(500, 300);
    background(250,230,230);
    canvas.parent('myCanvas');


}

function draw() {

}

function mousePressed(){
    ellipse(mouseX,mouseY,1,1);
}

//sockets part, how we establish a connection to the server - when you upload it, you might want to change "localhost" to your ip address
var socket = io.connect('https://localhost:8080');

//simple event listener to make sure we're connected
socket.on('connected', function(){
    console.log('connected to socket');
});

document.getElementById("myBtn").onclick = function() {saveImage()};

function test2(){
    console.log("FUNCTION!!!");
};
//function to be called when the user clicks the save button!
function saveImage(){
    console.log("uhuhiufe");
    //we get the canvas
    var cnv = document.getElementById('myCanvas');

    //we get whatever is drawn to the canvas and convert it to a given format, here it's .webp, and give it a quality (from 0 to 1)
    var dataURL = cnv.toDataURL('image/webp', 0.5);

    //then we send that data through the socket towards the server, and labeling that event "frame_to_server"
    socket.emit('frame_to_server', dataURL);
}
