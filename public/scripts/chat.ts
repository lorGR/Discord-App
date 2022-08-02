//@ts-ignore
const socket = io();

const number = 4;

socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("msg", (number));
});

function getRoomIdByParams(): string {
    try {
        const queryString = window.location.search;
        const urlSearchParams = new URLSearchParams(queryString)
        const roomId = urlSearchParams.get('roomId');
        return roomId;
    } catch (error) {
        console.error(error);
    }
}