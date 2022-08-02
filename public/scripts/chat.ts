//@ts-ignore
const socket = io();

const number = 4;

socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("msg", (number));
});
