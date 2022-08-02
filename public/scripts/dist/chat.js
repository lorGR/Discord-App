//@ts-ignore
var socket = io();
var number = 4;
socket.on("connect", function () {
    console.log(socket.id);
    socket.emit("msg", (number));
});
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
