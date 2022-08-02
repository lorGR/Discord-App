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
    socket.emit('checkRoomId', roomId);
});

function handleSendMessage(event) {
    try {
        event.preventDefault();
        const username = sessionStorage.getItem('name');
        const roomId = getRoomIdByParams();
        const text = event.target.msg.value;
        const msg = `${username}: ${text}`;
        socket.emit('sendMsg', roomId, msg);
    } catch (error) {
        console.error(error);
    }
}

const chatContainer = document.getElementById('chatContainer') as HTMLDivElement;

socket.on('sendMessageToClient', (msg) => {
    const newMsgDiv = document.createElement('div');
    
})
