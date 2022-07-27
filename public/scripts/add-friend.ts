async function handleAddFriend(event) {
    try {
        event.preventDefault();
        const friendUsername = event.target.friendUsername.value;

        // @ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Coulnd't recieve data from axios GET: '/users/get-user' ");
        //@ts-ignore
        const { userDB, error } = data;
        if (error) throw error;
        console.log(userDB);

        // @ts-ignore
        const { data } = await axios.post("/friends/add-friend", { friendUsername, userDB });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/friends/add-friend' ");
        // @ts-ignore
        const { friendUserDB, error } = data;
        if (error) throw error;
        console.log(friendUserDB);

    } catch (error) {
        console.error(error);
    }
}

