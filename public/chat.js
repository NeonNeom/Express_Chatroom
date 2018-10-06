$(document).ready(function() {
    //Make connection
    var socket = io.connect('http://localhost:4000');
    var themeColor = 'l';
    var classHolder;

    $("#lightTheme").click(function(){
        if(themeColor != 'l'){
            $("body").removeClass("darker");
            $("#chat-window, #sendMessage, .messageContainer").removeClass("dark");
            $("#theme").css("border", "1px solid rgb(228, 217, 217, .15)");
            classHolder = 'l';
            themeColor = 'l';
        }
    });

    $("#darkTheme").click(function(){
        if(themeColor != 'd'){
            $("body").addClass("darker");
            $("#chat-window, #sendMessage, .messageContainer").addClass("dark");
            $(".messageContainer").removeClass("l");
            $("#theme").css("border", "1px solid rgb(228, 217, 217, .1)");
            classHolder = 'dark';
            themeColor = 'd';
        }
    });

    $("#message").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#sendMessage").click();
        }
    });

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
        $("#output").append("<div class=\"messageContainer " + classHolder + "\"> <p class=\"chatName\">" + data.username + " </p> <p class=\"chatTimestamp\">" + data.date + "</p> <p class=\"chatMessage\">" + data.message + "</p> </div>");
    });

    socket.on('typing', function(data){
        $("#feedback").html("<p>" + data + " is typing... </p>");
    });
    
});





