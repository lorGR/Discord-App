//@ts-ignore
const socket = io();

const number = 4;

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

socket.on("connect", () => {
    const roomId = getRoomIdByParams();
    console.log(socket.id);
    socket.emit('checkRoomId', roomId);
});

function handleSendMessage(event) {
    try {
        event.preventDefault();
        const roomId = getRoomIdByParams();
        const msg = event.target.msg.value;
        socket.emit('sendMsg', roomId, msg);
    } catch (error) {
        console.error(error);
    }
}

socket.on('sendMessageToClient', (msg) => {
    console.log(msg);
})
