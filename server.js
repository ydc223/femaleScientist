
var express = require('express');
var http = require('http');
var path = require('path');
//fs - the filesystem module that allow to read/write from the disk
var fs =  require('fs');



var app = new express();
app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));


var myServer = http.createServer(app);
myServer.listen(app.get('port'), function(){
    console.log('server x started on port', app.get('port'));

});

//sockets - here we connect to our server, you might need to change "httpServer" to something like "app"


var io = require('socket.io').listen(myServer);

//main event: there is a connection. all of your socket-related code happens within that function
io.sockets.on('connection', function(socket){
    //we just log the fact that we have a new user!
    console.log('new user '+socket.id);

    //here, we listen to an event from the client side, and we have a callback function with that data
    socket.on('frame_to_server', function(data){

        //clean up the header so that we only get the core of the data
        var prefix = 'data:image/webp;base64,'; //specify what we want to get rid of
        var prefix_index = data.indexOf(prefix); //find the index of that (it should be 0, but just in case)
        var slicedImage = data.slice(prefix_index+prefix.length); //here we actually remove the header

        //then we create a new buffer to store our data
        var buff = new Buffer(slicedImage, 'base64');
        var d = new Date();
        //give a name for our file to save as
        fullDate = d.getDate()+d.getMonth()+d.getFullYear()+d.getTime();
        var name = 'public/images/'+fullDate+'.webp';
        //now we pass that data and we specify where to save it
        base64_decode(buff, './'+name);//we will save it to the same directory where the server.js script lives. you might want to change that!
    });
});

function base64_decode(file_name, image){
    //get the data, and write it as a .webp to the disk at the given location
    fs.writeFileSync(image, file_name);
}


app.get('/gallery', function(req, res, err){
    var image;

    fs.readdir('public/images', (err, files) => {
        if (err) {
            throw err;
        }
        image = files;
        res.write('<body style="background-color: tan">');
        res.write('<div align="center"><h1>Error 404 - Female Scientists Not Found</h1></div>');
        res.write('<div style = "border-top: 1px solid #000; padding-top: 10px;"></div>');
        res.write('<a href="http://westem.nyuad.im" style="margin: -20px -50px; position: relative; top:50%; left:40%;">Get involved with women empowered in STEM fields</a>');
        res.write('<div style = " padding-top: 30px;"></div>');
        res.write('<iframe style ="margin: -20px -50px; position: relative; top:50%; left:25%;" width="784" height="441" src="https://www.youtube.com/embed/EgkqeJnze0M" frameborder="0" allowfullscreen></iframe> ');

        res.write('<div style = "border-bottom: 1px solid #000; padding-top: 50px;"></div>');
        res.write('<div style = " padding-top: 30px;"></div>');
        //res.write('<div style = " padding-top: 30px;"></div>');
        //res.head('<link rel="stylesheet" href="style.css"/>');
        for(var i = image.length-1; i >=0; i--){
            res.write('<img width = "315" height="315" style="border-color: #111111; border-style: solid; display: inline-block;float: left;margin: 5px 5px;"src="images/'+image[i]+'"/>');
        }
        res.end();
            console.log(files);
        });

});



//turns base64 string to file data
