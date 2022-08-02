//@ts-ignore
var socket = io();
var number = 4;
socket.on("connect", function () {
    console.log(socket.id);
    socket.emit("msg", (number));
});
