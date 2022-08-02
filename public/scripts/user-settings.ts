function handleVisiblePassword () {
    try {
        const input = document.getElementById("passwordSetting") as HTMLInputElement;
        const icon = document.getElementById("passwordIcon") as HTMLImageElement;
        if (input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        } else if (input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    } catch (error) {
        console.error(error);
    }
}

function handleDisconnect(cookieName) {
    try {
        console.log('Disconnecting');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('userSrc');
        document.cookie = cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = '../index.html';
    } catch (error) {
        console.error(error);
    }
}

async function handleChangeImagePicture(event) {
    try {
        event.preventDefault();
        const imageUrl = event.target.userImage.value;
        const errorContainer = document.getElementById('errorsContainer') as HTMLSpanElement;
        if(!isImage(imageUrl)) {
            errorContainer.innerHTML = `URL isn't valid`;
            errorContainer.style.color = 'red';
        } 
        else {
            errorContainer.innerHTML = `Profile picture changed`;
            errorContainer.style.color = 'green';
        }
        const userDB = await handleGetUser();
        if (!userDB) throw new Error("Couldn't get user from handleGetUser -> Cookies");
        // GO TO USER DB and change the SRC 
    } catch (error) {
        console.error(error);
    }
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
