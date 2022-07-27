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
        document.cookie = cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = '../index.html';
    } catch (error) {
        console.error(error);
    }
}