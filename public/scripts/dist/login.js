function handleRegisterPage() {
    try {
        window.location.href = "./register.html";
    }
    catch (error) {
        console.error(error);
    }
}
function handleVisiblePass() {
    try {
        var input = document.getElementById("loginPassword");
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
