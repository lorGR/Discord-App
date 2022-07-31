const errorContainer = document.getElementById("errorConatinerAddFriend") as HTMLSpanElement;

async function handleAddFriend(event) {
    try {
        event.preventDefault();
        const friendUsername = event.target.friendUsername.value;
        errorContainer.innerHTML = "";
        // @ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Coulnd't recieve data from axios GET: '/users/get-user' ");
        //@ts-ignore
        const { userDB, error } = data;
        if (error) throw error;

        // @ts-ignore
        const { data } = await axios.post("/friends/add-friend", { friendUsername, userDB });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/friends/add-friend' ");
        // @ts-ignore
        const { friendUserDB, error } = data;
        if (error) {
            handleErrorsAddFriend(error);
            throw error;
        } 
        location.reload();
    } catch (error) {
        console.error(error);
    }
}

function handleErrorsAddFriend(error: string) {
    try {
        if(error.includes("Couldn't find user with username:")) errorContainer.innerHTML = "Username doesn't exist";
        if(error.includes("You already are friends")) errorContainer.innerHTML = "You are already friends";
        if(error.includes("Can't add yourself to friend list")) errorContainer.innerHTML = "You are already friend with yourself :)";
    } catch (error) {
        console.error(error);
    }
}

