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
    console.log(socket.id);
    socket.emit('checkRoomId', roomId);
});
function handleSendMessage(event) {
    try {
        event.preventDefault();
        var roomId = getRoomIdByParams();
        var msg = event.target.msg.value;
        socket.emit('sendMsg', roomId, msg);
    }
    catch (error) {
        console.error(error);
    }
}
socket.on('sendMessageToClient', function (msg) {
    console.log(msg);
});
