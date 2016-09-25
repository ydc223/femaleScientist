/**
 * Created by Yana on 22.09.2016.
 */
//sockets part, how we establish a connection to the server - when you upload it, you might want to change "localhost" to your ip address
var socket = io.connect('http://localhost:8080');

//simple event listener to make sure we're connected
socket.on('connected', function(){
    console.log('connected to socket');
});


//function to be called when the user clicks the save button!
function saveImage(){
    //we get the canvas
    var cnv = document.getElementById('defaultCanvas0');
    console.log(cnv);
    //we get whatever is drawn to the canvas and convert it to a given format, here it's .webp, and give it a quality (from 0 to 1)
    var dataURL = cnv.toDataURL('image/webp', 0.5);

    //then we send that data through the socket towards the server, and labeling that event "frame_to_server"
    socket.emit('frame_to_server', dataURL);
    location.href = "/gallery";
}
