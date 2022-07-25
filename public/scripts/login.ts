function handleRegisterPage() {
    try {
        window.location.href = "./register.html";
    } catch (error) {
        console.error(error);
    }
}

function handleVisiblePass() {
    try {
        const input = document.getElementById("loginPassword") as HTMLInputElement;
        const icon = document.getElementById("passwordIcon") as HTMLImageElement;        
        if(input.type === "password") {
            input.type = "text";
            icon.src = "../assets/svgs/eye-svgrepo-com.svg";
        } else if(input.type === "text") {
            input.type = "password";
            icon.src = "../assets/svgs/password-svgrepo-com.svg";
        }
    } catch (error) {
        console.error(error);
    }
}

async function handleLogin(event) {
    try {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        if ()
    } catch (error) {
        console.error(error);
    }
}