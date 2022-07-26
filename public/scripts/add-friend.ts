function handleHomePage() {
    try {
        window.location.href = "./home.html";
    } catch (error) {
        console.error(error);
    }
}

async function handleGetUser() {
    try {
        //@ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Couldn't recieve data from axios GET: '/users/get-user' ");
        console.log(data);

        const { userDB, error } = data;
        if (error) throw error;

        console.log(userDB);

        const username = document.getElementById("usernameBox") as HTMLHeadingElement;
        username.innerHTML = userDB.username;

    } catch (error) {
        console.error(error);
    }
}