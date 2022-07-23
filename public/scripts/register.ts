function handleLoginPage() {
    try {
        window.location.href = "./login.html";
    } catch (error) {
        console.error(error);
    }
}

function handleVisible() {
    try {
        const input = document.getElementById("registerPassword") as HTMLInputElement;
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

function handleVisibleReIcon() {
    try {
        const input = document.getElementById("registerRePassword") as HTMLInputElement;
        const icon = document.getElementById("rePasswordIcon") as HTMLImageElement;
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