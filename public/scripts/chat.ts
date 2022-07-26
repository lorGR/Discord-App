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
        const userInput = document.getElementById('userMessage') as HTMLInputElement;
        const username = sessionStorage.getItem('name');
        const userImg = sessionStorage.getItem('userSrc');
        const roomId = getRoomIdByParams();
        const text = event.target.msg.value;
        socket.emit('sendMsg', roomId, text, username, userImg);
        userInput.value = '';
    } catch (error) {
        console.error(error);
    }
}

const chatContainer = document.getElementById('chatContainer') as HTMLDivElement;

socket.on('sendMessageToClient', (msg, username, userImg) => {
    if(msg.length > 0){
        const newMsgDiv = document.createElement('div');
        const msgDivContent = document.createElement('div');
        const userUsername = document.createElement('h3');
        const userMessage = document.createElement('p');
        const userImage = document.createElement('img');
        
        newMsgDiv.classList.add('chat-msg');
        msgDivContent.classList.add('chat-content');
    
        userImage.src = `${userImg}`;
        userUsername.innerText = `${username}`;
        userMessage.innerText = `${msg}`;
    
        msgDivContent.append(userUsername, userMessage);
        newMsgDiv.append(userImage, msgDivContent);
        chatContainer.append(newMsgDiv);
    }
})

async function getUserFriend() {
    try {
        const userDB = await handleGetUser();
        if (!userDB) throw new Error("Couldn't reiceve user by handleGetUser() -> Cookies");

        const roomId = getRoomIdByParams();
        if (!roomId) throw new Error("Couldn't reiceve user by getRoomIdByParams() -> URLParams");

        //@ts-ignore
        const { data } = await axios.post("/friends/get-friendByRoomId", { userDB, roomId });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/friends/get-friendByRoomId' ");
        const { friend, error } = data;
        if (error) throw error;
        if (!friend) throw new Error("Couldn't recieve friend from data");

        renderFriend(friend);
    } catch (error) {
        console.error(error);
    }
}

function renderFriend(friend) {
    try {
        const friendImg = document.getElementById('chatUserImg') as HTMLImageElement;
        const friendUsername = document.getElementById('chatUsername') as HTMLHeadingElement;

        friendImg.src = friend.src;
        friendUsername.innerText = friend.username;
    } catch (error) {
        console.error(error);
    }
}
