$(document).ready(function() {
    //Make connection
    var socket = io.connect('http://localhost:4000');

    $("#sendMessage").click(function(){
        if($("#message").val().trim() !=""){
            var x = new Date($.now());
            socket.emit('chat',{
                username: $("#username").val(),
                message: $("#message").val(),
                date: x
            });
            $("#message").val("");
        }
    });

    $("#message").keypress(function() {
        socket.emit('typing',$("#username").val());
    });

    $("#message").keyup(function() {
        //socket.emit('notTyping',$("#username").val());
    });

    socket.on('chat', function(data){
        $("#feedback").html("");
        $("#output").append("<div class=\"messageContainer\"> <p class=\"chatName\">" + data.username + " </p> <p class=\"chatTimestamp\">" + data.date + "</p> <p class=\"chatMessage\">" + data.message + "</p> </div>");
    });

    socket.on('typing', function(data){
        $("#feedback").html("<p>" + data + " is typing... </p>");
    });
    
});





