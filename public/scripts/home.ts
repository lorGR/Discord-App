async function handleGetUser() {
    try {
        //@ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Couldn't recieve data from axios GET: '/users/get-user' ");
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}