console.log('connectes to chat.ts')

//@ts-ignore
const socket = io();

const messages = document.querySelector('.messageContainer__list')

const username = handleGetUser();
console.dir(username.PromiseResult)

async function handleGetUser() {
    try {
        //@ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Couldn't recieve data from axios GET: '/users/get-user' ");

        const { userDB, error } = data;
        if (error) throw error;

        const username = userDB.username

        return username
    } catch (error) {
        console.error(error);
    }
}

function handleSendMessage(event) {
    try {
        event.preventDefault()
        let message = event.target.messageInput.value
        if(!message) throw new Error('empty message')
        socket.emit('chat message', message);
        message = '';

    } catch (error) {
        console.log({error: error})
    }
   
}

socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = `${username}:${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});



