//@ts-ignore
var socket = io();
var number = 4;
function getRoomIdByParams() {
    try {
        var queryString = window.location.search;
        var urlSearchParams = new URLSearchParams(queryString);
        var roomId = urlSearchParams.get('roomId');
        return roomId;
    }
    catch (error) {
        console.error(error);
    }
}
socket.on("connect", function () {
    var roomId = getRoomIdByParams();
    socket.emit('checkRoomId', roomId);
});
function handleSendMessage(event) {
    try {
        event.preventDefault();
        var username = sessionStorage.getItem('name');
        var roomId = getRoomIdByParams();
        var text = event.target.msg.value;
        var msg = username + ": " + text;
        socket.emit('sendMsg', roomId, msg);
    }
    catch (error) {
        console.error(error);
    }
}
var chatContainer = document.getElementById('chatContainer');
socket.on('sendMessageToClient', function (msg) {
    var newMsgDiv = document.createElement('div');
});
