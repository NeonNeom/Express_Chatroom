var express = require('express');
var socket = require('socket.io');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
const port = 4000;
//App setup
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
 }));


var server = app.listen(port, function(){
    console.log("Listening... on port 4000");
});


//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);
io.on('connection', function(socket){
    console.log("Made socket connection");

    socket.on('chat', function(data){
        var now = new Date();
        if(dateFormat(now, "d m yy") == dateFormat(data.date, "d m yy")){
            data.date = dateFormat(data.date, "'Today at' h:MM TT");
        }else{
            data.date = dateFormat(data.date, "dddd 'at' h:MM TT");
        }
        
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data);
    });
});

