function handleVisiblePassword() {
    try {
        var input = document.getElementById("passwordSetting");
        var icon = document.getElementById("passwordIcon");
        if (input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        }
        else if (input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    }
    catch (error) {
        console.error(error);
    }
}
function handleDisconnect(cookieName) {
    try {
        console.log('Disconnecting');
        sessionStorage.removeItem('name');
        document.cookie = cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = '../index.html';
    }
    catch (error) {
        console.error(error);
    }
}
