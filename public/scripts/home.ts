const friendListContainer = document.getElementById("friendListContainer") as HTMLDivElement;

function handleHomePage() {
    try {
        window.location.href = "./home.html";
    } catch (error) {
        console.error(error);
    }
}

function handleAddFriendPage() {
    try {
        window.location.href = "./add-friend.html";
    } catch (error) {
        console.error(error);
    }
}

function handleSettingPage() {
    try {
        window.location.href = "./user-setting.html";
    } catch (error) {
        console.error(error);
    }
}

async function handleLoad() {
    try {
        handleGetUser();
        getAllFriends();
        renderUserSettings();
        getUserFriend();
    } catch (error) {
        console.error(error);
    }
}

async function handleGetUser() {
    try {
        //@ts-ignore
        const { data } = await axios.get("/users/get-user");
        if (!data) throw new Error("Couldn't recieve data from axios GET: '/users/get-user' ");

        const { userDB, error } = data;
        if (error) throw error;

        const username = document.getElementById("usernameBox") as HTMLHeadingElement;
        username.innerHTML = userDB.username;

        // const userImage = document.getElementById('userImage') as HTMLImageElement;
        // userImage.src = userDB.src;

        const greetUser = document.getElementById("greetingUser") as HTMLHeadingElement;
        if (greetUser) greetUser.innerHTML = `Hello ${userDB.username}`;

        return userDB;
    } catch (error) {
        console.error(error);
    }
}

async function getAllFriends() {
    try {
        const userDB = await handleGetUser();
        if (!userDB) throw new Error("Couldn't get User");
        //@ts-ignore
        const { data } = await axios.post('/friends/get-friends', { userDB });
        if (!data) throw new Error("Couldn't recieve data from axios POST: '/friends/get-friends' ");
        const { userFriendsDB, error } = data;
        if (error) throw error;
        renderFriends(userFriendsDB);

    } catch (error) {
        console.error(error);
    }
}

async function renderUserSettings() {
    try {
        const userDB = await handleGetUser();
        console.log(userDB);
        const usernameInput = document.getElementById("usenameSetting") as HTMLInputElement;
        const emailInput = document.getElementById("emailSetting") as HTMLInputElement;
        const passwordInput = document.getElementById("passwordSetting") as HTMLInputElement;
        const imageInput = document.getElementById("userImage") as HTMLInputElement;

        usernameInput.value = `${userDB.username}`;
        emailInput.value = `${userDB.email}`;
        passwordInput.value = `${userDB.password}`;
        imageInput.value = `${userDB.src}`;

    } catch (error) {
        console.error(error);
    }
}

function renderFriends(userFriendArray) {
    try {
        let html = '';
        console.log(userFriendArray);
        userFriendArray.forEach(userFriend => {
            html += `
                <div class="friend">
                    <div onclick="handleChatFriend('${userFriend.friend.username}')" class="right">
                        <img src="../assets/svgs/user-profile-svgrepo-com.svg">
                        <p>${userFriend.friend.username}</p>
                    </div>
                    <div onclick="handleDeleteFriend('${userFriend.friend.username}')" class="left">
                        <img src="../assets/svgs/trash-svgrepo-com.svg">
                    </div>
                </div>
            `;
        });
        friendListContainer.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function handleChatFriend(friendUsername: string) {
    try {
        const userDB = await handleGetUser();
        if (!userDB) throw new Error("Couldn't get user from data base");

        //@ts-ignore
        const { data } = await axios.post('/friends/get-sharedRoomId', {friendUsername, userDB});
        if (!data) throw new Error ("Couldn't recieve data from axios POST: '/friends/get-sharedRoomId' ");
        const { sharedRoomId, error } = data;
        if(error) throw error;

        window.location.href = `./chat.html?roomId=${sharedRoomId}`;
    } catch (error) {
        console.error(error);
    }
}

async function handleDeleteFriend(friendUsername: string) {
    try {
        const userDB = await handleGetUser();
        const { username } = userDB;
        console.log('Clicked trash icon');
        //@ts-ignore
        const { data } = await axios.delete("/friends/delete-friend", { data: { friendUsername, username } });
        if (!data) throw new Error("Coulnd't recieve data from axios DELETE: '/users/delete-friend' ");
        const { succses, error } = data;
        if (error) throw error;
        if (succses) {
            location.reload();
        }

    } catch (error) {
        console.error(error);
    }
}




